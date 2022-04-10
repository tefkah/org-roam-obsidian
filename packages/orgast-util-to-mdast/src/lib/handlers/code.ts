// based on https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/em

import { Emphasis, InlineCode, Strong } from 'mdast'
import { Bold, Code } from 'uniorg'
import { all } from '../all'
import { J, Node } from '../types'

export const code = (j: J, node: Code): InlineCode => {
  return j(node, 'inlineCode', node.value) as InlineCode
}
