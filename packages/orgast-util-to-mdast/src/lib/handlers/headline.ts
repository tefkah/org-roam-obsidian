import { GreaterElement, Headline } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const headline: Handle = (j: J, node: Headline) => {
  return j(node, 'heading', { depth: node.level }, all(j, node))
}
