import {
  ElementType,
  GreaterElement,
  GreaterElementType,
  Link,
  ObjectType,
  Text,
} from 'uniorg'
import {
  Handle,
  J,
  OrgastElement,
  OrgastRecursiveObject,
  OrgastParent,
} from '../types'
import { Link as MdastLink } from 'mdast'
import { convert } from 'unist-util-is'

import { CiteItem, InlineCiteNode } from '@benrbray/mdast-util-cite'
import { GeneratePrimeOptions } from 'crypto'
const isText = convert<Text>('text')

export const citation: Handle = (
  j: J,
  node: Link,
  parent?: OrgastParent | OrgastRecursiveObject | OrgastElement
): InlineCiteNode => {
  const { rawLink, linkType, path } = node
  const type = linkType.match(/(\/b|paren)/i) ? 'paren' : 'inline'
  const pathWithoutAt = path.replace(/@/g, '')
  const citeKeys = pathWithoutAt.split(';')
  const citeItems: CiteItem[] = citeKeys.map((key) => ({
    key,
    //  prefix: undefined,
    //  suffix: undefined,
    //  suppressAuthor: undefined,
  }))
  const citeKeysWithAt = citeKeys.map((key) => `@${key}`)

  if (parent) {
    //@ts-expect-error define the object better
    parent.children = parent.children.filter(
      (child: ObjectType | GreaterElementType | ElementType) =>
        !isText(child) || !['[', ']'].includes(child.value)
    )
  }
  return j(
    node,
    'cite',
    { data: { citeItems } },
    citeKeysWithAt.join(';')
  ) as InlineCiteNode
}
