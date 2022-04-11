import { HTML } from 'mdast'
import { Comment, GreaterElement } from 'uniorg'
import { Handle, J } from '../types'
import { toString } from 'orgast-util-to-string'

export const comment: Handle = (j: J, node: Comment): HTML | void => {
  if (j.preserveComments) {
    return j(node, 'html', `<!-- ${toString(node)} -->`) as HTML
  }
}
