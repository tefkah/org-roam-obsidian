import { Node } from 'unist'
import { Root as MdastRoot } from 'mdast'
export interface Options {}
export function toMdast(node: Node, options: Options): MdastRoot {
  return { type: 'root', children: [] }
}
