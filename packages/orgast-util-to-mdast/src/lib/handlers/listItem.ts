import { HTML, ListItem as MdastListItem } from 'mdast'
import { ListItem, GreaterElement } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const listItem: Handle = (
  j: J,
  node: ListItem,
  parent?: GreaterElement
): MdastListItem => {
  const props: Partial<Omit<MdastListItem, 'type' | 'children' | 'position'>> =
    {}

  if (node.checkbox === 'on') {
    props.checked = true
  }
  if (node.checkbox === 'off') {
    props.checked = false
  }
  return j(node, 'listItem', props, all(j, node)) as MdastListItem
}
