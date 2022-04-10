import { all } from '../all'
import { Text as MdastText } from 'mdast'
import { Handle, J, Node, Text } from '../types'
import { GreaterElement } from 'uniorg'

export const text: Handle = (
  j: J,
  node: Text,
  parent?: GreaterElement
): MdastText => {
  return node as MdastText
}
