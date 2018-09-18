/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 使用Array.prototype创建新的数组对象, 避免污染Array.prototype上的方法
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

// 对这些数组方法进行重写, 功能与原方法一致, 只是新增了一步通知watcher相应变化的操作
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 缓存数组原生方法, 以便后续调用, 用于重写方法时保持原功能不变
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 这三个操作是插入操作, 需要额外的observeArray方法进行观察变更
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 将改动通知watcher
    ob.dep.notify()
    return result
  })
})
