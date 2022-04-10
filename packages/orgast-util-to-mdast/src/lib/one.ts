import { all } from './all'
import { OrgastParent, Handle, J, MdastContent, Node } from './types'
import { wrapText } from './util/wrap-text'

export function one(
  j: J,
  node: Node,
  parent: OrgastParent
): MdastContent | Array<MdastContent> | void {
  const fn: Handle | undefined = j.handlers[node.type]

  if (typeof fn === 'function') {
    return fn(j, node, parent)
  }

  return unknown(j, node)
}

function unknown(j: J, node: Node) {
  // @ts-expect-error yayaya
  if (typeof node.value === 'string') {
    // @ts-expect-error yayaya
    return j(node, 'text', wrapText(j, node.value))
  }

  return all(j, node)
}
