/* @flow */

import on from './on'
import bind from './bind'
// import { noop } from 'shared/util'
import { noop } from '../../core/util'

export default {
  on,
  bind,
  cloak: noop
}
