/* @flow */

/**
 * VNode用于标识Virtual Dom的每一个节点, 通过一个对象来映射一个真实DOM节点
 * 每个VNode实例都包含以下属性:
 * tag: 当前节点的标签名
 * data: 当前节点的数据对象
 * children: 当前节点的所有子节点
 * text: 当前节点的文本，一般文本节点或注释节点会有该属性
 * elm: 当前Virtual Dom对应的真实的DOM节点, 这里只是持有该DOM的引用
 * ns: 节点的namespace
 * context: 组件渲染时的作用域
 * key: 节点的key属性，用于作为节点的标识，即v-for时指定的key, 有利于后续patch操作的优化
 * componentOptions: 创建组件实例时会用到的选项信息
 * componentInstance: 当前节点对应的组件实例的引用
 * parent: 组件的占位节点
 * raw: 是否使用html字符串 只在ssr使用
 * isStatic: 静态节点的标识
 * isRootInsert: 是否作为根节点插入
 * isComment: 是否是注释节点
 * isCloned: 是否为克隆节点
 * isOnce: 当前节点是否有v-once指令
 * asyncFactory: 异步组件工厂函数
 * asyncMeta: 异步组件的元信息
 * isAsyncPlaceholder: 是否是异步组件占位符
 * ssrContext: 服务端渲染作用域
 * fnContext: 函数式节点渲染作用域
 * fnOptions: 函数式组件选项信息
 * fnScopeId: 函数式组件作用域id
 */
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  /**
   * 在较早(2.5.8)之前的版本中 标识当前节点的组件实例字段是child, 后来改为componentInstance
   * 为了保持向下兼容, 对child属性的get做了特殊的处理
  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}

/**
 * 创建一个空的注释节点
 * 当需要创建一个虚拟节点时, 有些情况下需要直接创建一个空节点, 具体内容会在create-element.js文件中详解
 */
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

/**
 * 创建一个文本节点
 * 文本节点创建比较频繁, 所以单独封装一个方法出来
 */
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

/**
 * 浅克隆一个节点, 在slot或者静态节点中会用到这个方法
 */
// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.isCloned = true
  return cloned
}
