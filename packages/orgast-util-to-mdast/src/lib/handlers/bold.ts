// based on https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/em

import { Emphasis, Strong } from 'mdast'
import { Bold } from 'uniorg'
import { all } from '../all'
import { Handle, J, Node } from '../types'

export const bold: Handle = (j: J, node: Bold): Strong => {
  return j(node, 'strong', all(j, node)) as Strong
}
