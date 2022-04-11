import { Node } from 'unist'
import { Root as MdastRoot } from 'mdast'
import { Plugin } from 'unified'
import { OrgData } from 'uniorg'
import { Options, toMdast } from 'orgast-util-to-mdast'

export default function uniorgRemark(
  options: void | Options | undefined = {}
): ReturnType<Plugin<[Options?] | void[], OrgData, MdastRoot>> {
  return (node, file) => {
    const result = toMdast(node, {
      ...options,
    }) as MdastRoot
    return result
  }
}

export { Options }
