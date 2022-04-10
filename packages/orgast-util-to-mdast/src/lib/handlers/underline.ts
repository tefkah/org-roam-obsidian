import { HTML } from 'mdast'
import { GreaterElement, Underline } from 'uniorg'
import { Handle, J } from '../types'
import { wrapText } from '../util/wrap-text'
import { toString } from 'orgast-util-to-string'
import { trimTrailingLines } from 'trim-trailing-lines'

export const underline: Handle = (
  j: J,
  node: Underline,
  parent?: GreaterElement
): HTML => {
  // TODO: Convert contents to HTML using orgToHast
  const code = j(node, 'html', `<u>${toString(node)}</u>`)
  return code as HTML
}
