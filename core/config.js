/* @flow */

import {
  no,
  noop,
  identity
} from 'shared/util'

import { LIFECYCLE_HOOKS } from 'shared/constants'

export type Config = {
  // user
  // 合并策略
  optionMergeStrategies: { [key: string]: Function };
  // 是否打印警告log
  silent: boolean;
  // 在启动时显示生产模式提示信息
  productionTip: boolean;
  // 是否开启性能记录功能
  performance: boolean;
  // 是否开启devtools
  devtools: boolean;
  // 是否捕获全局的错误
  errorHandler: ?(err: Error, vm: Component, info: string) => void;
  // 是否捕获全局的警告
  warnHandler: ?(msg: string, vm: Component, trace: string) => void;
  // 要特殊忽略的元素
  ignoredElements: Array<string | RegExp>;
  // 键盘事件别名
  keyCodes: { [key: string]: number | Array<number> };

  // platform
  // 是否检查保留字tag, 用于避免与原生tag冲突
  isReservedTag: (x?: string) => boolean;
  // 是否检查保留属性
  isReservedAttr: (x?: string) => boolean;
  // 解析特定平台的标签名
  parsePlatformTagName: (x: string) => string;
  // 检查tag是否是未知元素
  isUnknownElement: (x?: string) => boolean;
  // 获取tag的命名空间
  getTagNamespace: (x?: string) => string | void;
  // 检查属性是否必须用prop绑定
  mustUseProp: (tag: string, type: ?string, name: string) => boolean;

  // legacy
  // 生命周期钩子枚举
  _lifecycleHooks: Array<string>;
};

export default ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
}: Config)
