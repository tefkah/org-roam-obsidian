import { HTML } from 'mdast'
import { Comment, GreaterElement } from 'uniorg'
import { Handle, J } from '../types'

export const comment: Handle = (j: J, node: Comment): HTML | void => {
  if (j.preserveComments) {
    return j(node, 'html', `<!-- ${node.value} -->`) as HTML
  }
}
