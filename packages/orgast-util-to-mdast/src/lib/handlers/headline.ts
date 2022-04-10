import { GreaterElement, Headline } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const headline: Handle = (
  j: J,
  node: Headline,
  parent?: GreaterElement
) => {
  return j(node, 'heading', { depth: node.level }, all(j, node))
}
