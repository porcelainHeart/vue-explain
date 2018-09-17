/* @flow */
// 用于判断是否是异步占位节点(或注释节点)
export function isAsyncPlaceholder (node: VNode): boolean {
  return node.isComment && node.asyncFactory
}
