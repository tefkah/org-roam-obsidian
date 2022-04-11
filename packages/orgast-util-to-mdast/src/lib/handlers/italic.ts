// based on https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/em

import { Emphasis } from 'mdast'
import { all } from '../all'
import { Handle, J, Node } from '../types'

export const italic: Handle = (j: J, node: Node): Emphasis => {
  return j(node, 'emphasis', all(j, node)) as Emphasis
}
