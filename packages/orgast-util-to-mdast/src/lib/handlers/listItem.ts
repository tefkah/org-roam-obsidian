import { ListItem } from 'uniorg-types'
import { all } from 'uniorg-util-to-mdast'
import { CommandArg } from 'mdast'
import { wrap } from '../util/wrap'
import { J } from '../types'

export function listItem(j: J, item: ListItem) {
  return j(item, 'listItem', all(j, item))
}
