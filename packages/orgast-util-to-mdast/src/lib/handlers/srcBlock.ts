import { Code } from 'mdast'
import { GreaterElement, GreaterElementType, SrcBlock } from 'uniorg'
import { Handle, J } from '../types'
import { wrapText } from '../util/wrap-text'
import { toString } from 'orgast-util-to-string'
import { trimTrailingLines } from 'trim-trailing-lines'

export const srcBlock: Handle = (j: J, node: SrcBlock): Code => {
  const code = j(
    node,
    'code',
    { lang: node.language || null, meta: null },
    trimTrailingLines(wrapText(j, toString(node)))
  )
  return code as Code
}
