### Vue源码解析

> 通过注释的方式解析vue的每一行代码，帮助你更容易理解这个神奇的框架

### 关于本项目

- 本项目中代码截取自`vue@2.5.17`仓库中`src`目录
- 人力有时尽, vue完整仓库代码过于庞大, 暂时只对`core`目录下的内容进行解析
- 所有的解析都将通过注释的方式写入这个仓库的每一个代码文件中, 其中, 中文的注释为解析内容, 其他注释为原代码注释
- 阅读此项目需具备一定的JavaScript基础, 过于基础的代码并不会详细解析
- 欢迎其他人通过PR参与贡献和完善这个项目

#### 更新进度

```
./core
├── components
│   ├── index.js
│   └── keep-alive.js
├── config.js
├── global-api
│   ├── assets.js
│   ├── extend.js
│   ├── index.js
│   ├── mixin.js
│   └── use.js
├── index.js ------------------------------------- 已完成
├── instance
│   ├── events.js
│   ├── index.js
│   ├── init.js
│   ├── inject.js
│   ├── lifecycle.js
│   ├── proxy.js
│   ├── render-helpers
│   │   ├── bind-object-listeners.js
│   │   ├── bind-object-props.js
│   │   ├── check-keycodes.js
│   │   ├── index.js
│   │   ├── render-list.js
│   │   ├── render-slot.js
│   │   ├── render-static.js
│   │   ├── resolve-filter.js
│   │   └── resolve-slots.js
│   ├── render.js
│   └── state.js
├── observer
│   ├── array.js
│   ├── dep.js
│   ├── index.js
│   ├── scheduler.js
│   ├── traverse.js
│   └── watcher.js
├── util
│   ├── debug.js
│   ├── env.js
│   ├── error.js
│   ├── index.js
│   ├── lang.js
│   ├── next-tick.js
│   ├── options.js
│   ├── perf.js
│   └── props.js
└── vdom
    ├── create-component.js
    ├── create-element.js
    ├── create-functional-component.js
    ├── helpers
    │   ├── extract-props.js
    │   ├── get-first-component-child.js
    │   ├── index.js
    │   ├── is-async-placeholder.js
    │   ├── merge-hook.js
    │   ├── normalize-children.js
    │   ├── resolve-async-component.js
    │   └── update-listeners.js
    ├── modules
    │   ├── directives.js
    │   ├── index.js
    │   └── ref.js
    ├── patch.js ------------------------------------- 进行中
    └── vnode.js ------------------------------------- 已完成
```