import { GreaterElement, Link } from 'uniorg'
import { Handle, J } from '../types'
import { Link as MdastLink } from 'mdast'
import { citation } from './citation'
import { InlineCiteNode } from '@benrbray/mdast-util-cite'

export const link: Handle = (
  j: J,
  node: Link,
  parent?: GreaterElement
): MdastLink | InlineCiteNode | void => {
  if (node.linkType.includes('cite')) {
    return citation(j, node, parent) as InlineCiteNode
  }
}
