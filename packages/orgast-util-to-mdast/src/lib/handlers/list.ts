import { HTML, List as MdastList } from 'mdast'
import { List, GreaterElement } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const list: Handle = (j: J, node: List): MdastList => {
  switch (node.listType) {
    case 'ordered':
      return j(
        node,
        'list',
        { spread: false, ordered: true },
        all(j, node)
      ) as MdastList
    case 'unordered':
      return j(
        node,
        'list',
        { ordered: false, spread: false },
        all(j, node)
      ) as MdastList
    // TODO: Properly support descriptive lists
    case 'descriptive':
      return j(
        node,
        'list',
        { ordered: null, spread: false },
        all(j, node)
      ) as MdastList
  }
}
