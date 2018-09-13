import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

/**
 * 添加全局的API
 */
initGlobalAPI(Vue)

/**
 * 服务端渲染需要
 */
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

/**
 * 服务端渲染需要
 */
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

/**
 * 服务端渲染需要
 */
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

/**
 * vue版本号 这里的'__VERSION__'为占位符，发布版本时将被自动替换
 */
Vue.version = '__VERSION__'

/**
 * 导出Vue构造函数
 */
export default Vue
