export const envRegex = (envName?: string) =>
  new RegExp(
    `\\\\begin\\{(${envName || '.*?'})\\}[ \n]*(.*?)[ \n]*\\\\end\\{\\1\\}`,
    'igm'
  )

export const singleDollarMathRegex = /(\$)([^$]*?)\1/g
export const doubleDollarMathRegex = /(\$\$)(.*?)\1/gim
export const bracketMathRegex = /(\\\[)(.*?)(\\\])/gim
export const parenMathRegex = /(\\\()(.*?)(\\\))/gim

export const isInlineMath = (value: string) =>
  value.match(singleDollarMathRegex) || value.match(bracketMathRegex)

export const isMath = (value: string) =>
  value.match(doubleDollarMathRegex) || value.match(parenMathRegex)
