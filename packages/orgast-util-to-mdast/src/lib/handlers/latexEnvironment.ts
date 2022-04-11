import { GreaterElement, LatexEnvironment } from 'uniorg'
import { Handle, J } from '../types'
import { Math } from 'mdast-util-math'
import { all } from '../all'
import { envRegex } from '../util/regexes'

export const latexEnvironment: Handle = (
  j: J,
  node: LatexEnvironment
): Math | void => {
  // check if it's an equation environment
  const mathRegex = envRegex('equation|align|equation*|align*')
  if (node.value.match(mathRegex)) {
    const contents = node.value.replace(mathRegex, '$2')
    return j(node, 'math', contents.trim()) as Math
  }

  return
}
