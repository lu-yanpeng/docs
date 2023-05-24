# 手动创建vue项目

不使用脚手架，手动创建vue项目


## package.json

创建一个文件夹，然后用包管理器初始化项目。

```shell
pnpm init
pnpm add -D vite
pnpm add vue
```

执行完会自动在当前目录下创建`package.json`。顺便把vite和vue也一起安装了

还需要把启动命令配置一下

```json
{
    ...
    "scripts": {
        "dev": "vite"        
    },
    ...
}
```

## index.html

创建`index.html`作为启动文件，vite启动时会自动运行这个文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="module" src="./src/main.js"></script>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

## src/main.js

创建vue项目入口文件，在这里创建根应用然后挂载到html文件中

```js
import { createApp } from 'vue/dist/vue.esm-bundler'


const app = createApp({
    template: '<h1>手动构建vue</h1>'
})
app.mount('#app')
```

## 启动

需要在`package.json`里面配置好启动命令才能启动。

```shell
pnpm dev
```

## 整体结构

```text
|
  node_modules
  src
    - main.js
  index.html
  package.json
```