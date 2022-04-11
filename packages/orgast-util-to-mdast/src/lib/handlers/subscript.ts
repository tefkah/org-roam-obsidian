import { HTML } from 'mdast'
import { GreaterElement, Subscript } from 'uniorg'
import { Handle, J } from '../types'
import { toString } from 'orgast-util-to-string'

export const subscript: Handle = (j: J, node: Subscript): HTML => {
  // TODO: Convert subscript contents to HTML using orgToHast
  const sub = j(node, 'html', `<sub>${toString(node)}</sub>`)
  return sub as HTML
}
