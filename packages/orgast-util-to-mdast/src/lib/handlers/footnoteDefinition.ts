import { FootnoteDefinition as MdastFootnote } from 'mdast'
import { FootnoteDefinition } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const footnoteDefinition: Handle = (
  j: J,
  node: FootnoteDefinition
): MdastFootnote => {
  return j(
    node,
    'footnoteDefinition',
    { identifier: node.label },
    all(j, node)
  ) as MdastFootnote
}
