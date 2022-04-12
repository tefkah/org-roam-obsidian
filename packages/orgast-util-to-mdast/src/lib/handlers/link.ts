import { Element, GreaterElement, Link, RecursiveObject } from 'uniorg'
import {
  Handle,
  hasAffiliatedKeywords,
  J,
  OrgastContent,
  WikiLink,
  WithAffiliatedKeywordsType,
} from '../types'
import { Literal } from 'unist'
import { Link as MdastLink, Image as MdastImage, Text } from 'mdast'
import { citation } from './citation'
import { InlineCiteNode } from '@benrbray/mdast-util-cite'
import { toString } from 'orgast-util-to-string'
import { all } from '../all'
import { wrap } from '../util/wrap'
import path from 'path'

const imageFileExtensions = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'tiff',
  'tif',
  'xbm',
  'xpm',
  'pbm',
  'pgm',
  'ppm',
  'pnm',
  'svg',
]

export const link: Handle = (
  j: J,
  node: Link,
  parent?: GreaterElement | Element
): MdastLink | MdastImage | InlineCiteNode | Text | WikiLink | void => {
  if (node.linkType.includes('cite')) {
    return citation(j, node) as InlineCiteNode
  }
  if (node.format === 'plain') {
    // TODO: find a better solution for not escaping certain text
    //@ts-expect-error Raw Text
    return j(node, 'rawText', node.rawLink) as Text
  }

  if (node.linkType === 'id') {
    const linkText = toString(node)
    const val =
      j?.idData?.[node.path]?.title ?? linkText ?? node.path ?? node.rawLink
    return {
      type: 'wikiLink',
      value: val,
      data: {
        permalink: node.path,
        alias: linkText || val,
        exists: !!j?.idData?.[node.path],
      },
    } as WikiLink
  }

  if (node.linkType.includes('http')) {
    return j(node, 'link', { url: node.rawLink }, all(j, node)) as MdastLink
  }

  const extension = path.extname(node.path).slice(1)
  // Image
  if (node.linkType === 'file' && imageFileExtensions.includes(extension)) {
    const caption = hasAffiliatedKeywords(parent)
      ? Array.isArray(parent?.affiliated?.CAPTION)
        ? // TODO: clean up conditional checking for caption
          parent?.affiliated?.CAPTION?.flat()
            //@ts-expect-error this is a mess
            .map((node) => toString(node))
            .join(' ')
            .replace(/\n/g, '')
        : parent?.affiliated?.CAPTION
      : undefined

    return j(node, 'image', {
      url: node.path,
      alt: toString(node),
      title: caption,
    }) as MdastImage
  }
}
