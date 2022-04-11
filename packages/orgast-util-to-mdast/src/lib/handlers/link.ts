import { GreaterElement, Link } from 'uniorg'
import { Handle, J, WikiLink } from '../types'
import { Literal } from 'unist'
import { Link as MdastLink } from 'mdast'
import { citation } from './citation'
import { InlineCiteNode } from '@benrbray/mdast-util-cite'
import { toString } from 'orgast-util-to-string'

export const link: Handle = (
  j: J,
  node: Link
): MdastLink | InlineCiteNode | WikiLink | void => {
  if (node.linkType.includes('cite')) {
    return citation(j, node) as InlineCiteNode
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
}
