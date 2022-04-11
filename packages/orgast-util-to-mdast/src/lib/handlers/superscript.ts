import { HTML } from 'mdast'
import { GreaterElement, Superscript } from 'uniorg'
import { Handle, J } from '../types'
import { toString } from 'orgast-util-to-string'

export const superscript: Handle = (j: J, node: Superscript): HTML => {
  // TODO: Convert superscript contents to HTML using orgToHast
  const sup = j(node, 'html', `<sup>${toString(node)}</sup>`)
  return sup as HTML
}
