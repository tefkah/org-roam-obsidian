import { all } from '../all'
import { J, MdastContent, Node } from '../types'
import { wrap } from './wrap'

export function wrapChildren(j: J, node: Node): Array<MdastContent> {
  return wrap(all(j, node))
}
