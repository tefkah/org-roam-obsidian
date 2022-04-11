import { all } from '../all'
import { Text as MdastText } from 'mdast'
import { Handle, J, Node, Text } from '../types'
import { GreaterElement } from 'uniorg'

export const text: Handle = (j: J, node: Text): MdastText => {
  if (node.value.at(-1) === '\n') {
    node.value = node.value.slice(0, -1)
  }
  return node as MdastText
}
