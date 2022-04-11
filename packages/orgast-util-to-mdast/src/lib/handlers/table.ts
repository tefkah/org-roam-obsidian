import { Table, TableTableEl } from 'uniorg'
import { Handle, J } from '../types'
import { Table as MdastTable, InlineCode } from 'mdast'
import { convert } from 'unist-util-is'
import { all } from '../all'

const isTableEl = convert<TableTableEl>('table')
export const table: Handle = (
  j: J,
  node: Table | TableTableEl
): MdastTable | InlineCode => {
  if (isTableEl(node) && node.tableType === 'table.el') {
    return { type: 'inlineCode', value: node.value } as InlineCode
  }

  return j(node, 'table', all(j, node)) as MdastTable
}
