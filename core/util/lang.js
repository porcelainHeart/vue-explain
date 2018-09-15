/* @flow */

/**
 * Check if a string starts with $ or _
 */
/**
 * 用于检查一个key是否是私有或内部属性
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
// 添加一个属性, 和直接对obj.key赋值没什么区别
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 */
/**
 * 创建一个可以解析对象属性路径的function
 * 比如 let a = { b: { c: { d: 1 } } }
 * parsePath('b.c.d')(a) 会返回 1
 */
const bailRE = /[^\w.$]/
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
