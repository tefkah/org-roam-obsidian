import { TableCell } from 'uniorg'
import { Handle, J } from '../types'
import { TableCell as MdastTableCell } from 'mdast'
import { all } from '../all'

export const tableCell: Handle = (j: J, node: TableCell): MdastTableCell => {
  return j(node, 'tableCell', all(j, node)) as MdastTableCell
}
