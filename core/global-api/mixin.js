/* @flow */

import { mergeOptions } from '../util/index'
// 提供Vue.mixin API, 使用mergeOptions来合并mixin配置, mergeOptions详见util/options.js
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
