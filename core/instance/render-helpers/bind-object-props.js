/* @flow */

import config from 'core/config'

import {
  warn,
  isObject,
  toObject,
  isReservedAttribute
} from 'core/util/index'

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */

// 用于解析v-bind指令绑定对象类型值的场景, 将
export function bindObjectProps (
  data: any,
  tag: string,
  value: any,
  asProp: boolean,
  isSync?: boolean
): VNodeData {
  // 如果v-bind指令未传参数, 什么都不做, 直接返回原data
  if (value) {
    // 如果v-bind指令的参数不是object,array 直接报错
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      )
    } else {
      // 参数是数组时, 格式化成object
      if (Array.isArray(value)) {
        value = toObject(value)
      }
      let hash
      for (const key in value) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data
        } else {
          const type = data.attrs && data.attrs.type
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {})
        }
        // 把参数的key复制到data中, 对于使用sync修饰符的场景特殊处理
        if (!(key in hash)) {
          hash[key] = value[key]

          if (isSync) {
            const on = data.on || (data.on = {})
            on[`update:${key}`] = function ($event) {
              value[key] = $event
            }
          }
        }
      }
    }
  }
  return data
}
