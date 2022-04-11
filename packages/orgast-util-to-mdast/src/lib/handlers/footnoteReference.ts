import { FootnoteReference as MdastFootnote } from 'mdast'
import { FootnoteReference } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const footnoteReference: Handle = (
  j: J,
  node: FootnoteReference
): MdastFootnote => {
  return j(
    node,
    'footnoteReference',
    { identifier: node.label },
    all(j, node)
  ) as MdastFootnote
}
