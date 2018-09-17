### Vue源码解析

> 通过注释的方式解析vue的每一行代码，帮助你更容易理解这个神奇的框架

### 关于本项目

- 本项目中代码截取自`vue@2.5.17`仓库中`src`目录
- 所有的解析都将通过注释的方式写入这个仓库的每一个代码文件中, 其中, 中文的注释为解析内容, 其他注释为原代码注释
- 阅读此项目需具备一定的JavaScript基础, 过于基础的代码并不会详细解析
- 人力有时尽, vue完整仓库代码过于庞大, 欢迎其他人通过PR参与贡献和完善这个项目

#### 更新进度

```
./core
├── components ----------------------------------- 已完成
│   ├── index.js --------------------------------- 已完成
│   └── keep-alive.js ---------------------------- 已完成
├── config.js ------------------------------------ 已完成
├── global-api ----------------------------------- 已完成
│   ├── assets.js -------------------------------- 已完成
│   ├── extend.js -------------------------------- 已完成
│   ├── index.js --------------------------------- 已完成
│   ├── mixin.js --------------------------------- 已完成
│   └── use.js ----------------------------------- 已完成
├── index.js ------------------------------------- 已完成
├── instance
│   ├── events.js
│   ├── index.js --------------------------------- 已完成
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
│   └── state.js --------------------------------- 进行中
├── observer
│   ├── array.js
│   ├── dep.js
│   ├── index.js
│   ├── scheduler.js
│   ├── traverse.js
│   └── watcher.js
├── util -------------------------------------------- 已完成
│   ├── debug.js ------------------------------------ 已完成
│   ├── env.js   ------------------------------------ 已完成
│   ├── error.js ------------------------------------ 已完成
│   ├── index.js ------------------------------------ 已完成
│   ├── lang.js ------------------------------------- 已完成
│   ├── next-tick.js -------------------------------- 已完成
│   ├── options.js ---------------------------------- 已完成
│   ├── perf.js ------------------------------------- 已完成
│   └── props.js ------------------------------------ 已完成
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