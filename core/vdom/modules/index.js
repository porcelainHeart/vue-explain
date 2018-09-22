import directives from './directives'
import ref from './ref'

// vnode的patch操作时需要使用,对指令和ref进行patch
export default [
  ref,
  directives
]
