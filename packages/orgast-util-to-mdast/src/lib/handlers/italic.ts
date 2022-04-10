// based on https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/em

import { Emphasis } from 'mdast'
import { all } from '../all'
import { J, Node } from '../types'

export function italic(j: J, node: Node): Emphasis {
  return j(node, 'emphasis', all(j, node)) as Emphasis
}
