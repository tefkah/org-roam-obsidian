// based on https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/em

import { Emphasis, Strong } from 'mdast'
import { Bold } from 'uniorg'
import { all } from '../all'
import { J, Node } from '../types'

export const bold = (j: J, node: Bold): Strong => {
  return j(node, 'strong', all(j, node)) as Strong
}
