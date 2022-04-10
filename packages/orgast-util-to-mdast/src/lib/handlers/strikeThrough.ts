import { Delete as MdastStrikeThrough } from 'mdast'
import { GreaterElement, StrikeThrough } from 'uniorg'
import { Handle, J } from '../types'
import { all } from '../all'

export const strikeThrough: Handle = (
  j: J,
  node: StrikeThrough,
  parent?: GreaterElement
): MdastStrikeThrough => {
  const strike = j(node, 'delete', all(j, node))
  return strike as MdastStrikeThrough
}
