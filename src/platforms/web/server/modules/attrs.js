/* @flow */

import { escape } from '../util'

// import {isDef,isUndef,extend} from 'shared/util'
import {isDef,isUndef,extend} from '../../../../shared/util'

// import {isBooleanAttr,isEnumeratedAttr,isFalsyAttrValue,convertEnumeratedValue} from 'web/util/attrs'
import {isBooleanAttr,isEnumeratedAttr,isFalsyAttrValue,convertEnumeratedValue} from '../../../web/util/attrs'

import { isSSRUnsafeAttr } from 'web/server/util'

export default function renderAttrs (node) {
  let attrs = node.data.attrs
  let res = ''

  const opts = node.parent && node.parent.componentOptions
  if (isUndef(opts) || opts.Ctor.options.inheritAttrs !== false) {
    let parent = node.parent
    while (isDef(parent)) {
      if (isDef(parent.data) && isDef(parent.data.attrs)) {
        attrs = extend(extend({}, attrs), parent.data.attrs)
      }
      parent = parent.parent
    }
  }

  if (isUndef(attrs)) {
    return res
  }

  for (const key in attrs) {
    if (isSSRUnsafeAttr(key)) {
      continue
    }
    if (key === 'style') {
      // leave it to the style module
      continue
    }
    res += renderAttr(key, attrs[key])
  }
  return res
}

export function renderAttr (key, value) {
  if (isBooleanAttr(key)) {
    if (!isFalsyAttrValue(value)) {
      return ` ${key}="${key}"`
    }
  } else if (isEnumeratedAttr(key)) {
    return ` ${key}="${escape(convertEnumeratedValue(key, value))}"`
  } else if (!isFalsyAttrValue(value)) {
    return ` ${key}="${escape(String(value))}"`
  }
  return ''
}
