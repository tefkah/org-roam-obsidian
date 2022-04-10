import { GreaterElement, Link } from 'uniorg'
import { J } from '../types'
import { Link as MdastLink } from 'mdast'

export const citation: Handle = (
  j: J,
  node: Link,
  parent: GreaterElement
): MdastLink => {}
