import { GreaterElement, LatexFragment } from 'uniorg'
import { Handle, J } from '../types'
import { InlineMath, Math } from 'mdast-util-math'

export const latexFragment: Handle = (
  j: J,
  node: LatexFragment,
  parent?: GreaterElement
): InlineMath | Math => {
  console.log(node)
  if (node.value[1] === '$' || node.value[2] === '[') {
    return j(node, 'math', node.contents.trim()) as InlineMath
  }
  return j(node, 'inlineMath', node.contents.trim()) as Math
}
