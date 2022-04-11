import { Heading, List, ListItem, Text } from 'mdast'
import { GreaterElement, Headline } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const headline: Handle = (
  j: J,
  node: Headline
): Heading | List | void => {
  if (node.level > 12) {
    if (!node.todoKeyword) return
    return j(node, 'list', { ordered: false, spread: false }, [
      j(
        node,
        'listItem',
        { checked: ['DONE', 'KILL'].includes(node.todoKeyword) ? true : false },
        [j(node, 'paragraph', all(j, node))]
      ),
    ]) as List
  }
  if (node.todoKeyword) {
    node?.children?.unshift({ type: 'text', value: `${node.todoKeyword} ` })
  }

  if (node.tags.length > 0) {
    const tags = node.tags.map((tag) => `#${tag}`).join(' ')
    node.children.push({ type: 'text', value: tags })
  }

  return j(node, 'heading', { depth: node.level }, all(j, node)) as Heading
}
