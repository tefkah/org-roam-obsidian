import { Node } from 'unist'
import { Root as MdastRoot } from 'mdast'
import { Plugin } from 'unified'
import { OrgData } from 'uniorg'
import { Options, toMdast } from 'orgast-util-to-mdast'

export default function uniorgRemark(
  options: void | Options | undefined = {}
): ReturnType<Plugin<[Options?] | void[], OrgData, OrgData>> {
  //Transformer<OoxastRoot, OoxastRoot> | void {
  //@ts-expect-error there should be a better way to cast this
  //THIS IS FINE
  return (node, file) => {
    const result = toMdast(node, {
      ...options,
    }) as MdastRoot
    return result
  }
}
