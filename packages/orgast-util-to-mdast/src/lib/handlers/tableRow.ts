import { TableRow } from 'uniorg'
import { Handle, J } from '../types'
import { TableRow as MdastTableRow } from 'mdast'
import { all } from '../all'

export const tableRow: Handle = (j: J, node: TableRow): MdastTableRow => {
  return j(node, 'tableRow', all(j, node)) as MdastTableRow
}
