/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
// Dep用于管理watcher, dep实例可以被多个指令观察
export default class Dep {
  // target是一个全局唯一的Watcher
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;
  // 生成每个实例唯一的uid, subs用于存储watcher
  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 添加一个watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 删除一个watcher
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 将自身加入到全局的watcher中
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 通知所有订阅者
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
// 置空Dep.target以免后续重复添加依赖, 设计一个栈来存取watcher
Dep.target = null
const targetStack = []

// 将watcher实例赋值给Dep.target，用于依赖收集。同时将该实例存入target栈中
export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

// 从target栈取出一个watcher实例
export function popTarget () {
  Dep.target = targetStack.pop()
}
