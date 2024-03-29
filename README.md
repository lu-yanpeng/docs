## 启动项目

安装依赖

```shell
pnpm install
```

> 如果没有安装pnpm，可以用这个命令全局安装 `npm install -g pnpm`

启动

```shell
pnpm docs:dev
```

启动后访问 `http://localhost:5173/docs/` 第一次启动会比较慢耐心等待，只要不报错就会正常显示。

如果打包报错`ReferenceError: document is not defined`看看组件哪里用到了document对象，因为`vitepress`是通过SSR在node环境下
打包的，这里没有document所以报错。

解决

```js
if (typeof document !== "undefined") {
  // 在这里使用 document
  document.getElementById("your-element");
}

onMounted(() => document.getElementById("your-element"))
```

SSR打包只会在`beforeCreate`和`created`的时候检查对象，所以在`mounted`里面用document就不会报错


## 路由

路由默认是根据pages来设置的，`/pages/index.md`会解析成`localhost/index`


### 图片

静态资源需要放在pages下，不在它下面就会解析不到，如果图片放在pages的上一层，就会解析成`/src/images/test.png`。
正确的路径应该是`/images/test.png`

如果使用vite的导入功能`import`，可以导入pages外部的文件，但是只能在md文件里面的`<script>`标签使用。


## 组件

组件只能导入当前目录下的其他组件，如果是`../`这种路径就会报错。


## 项目结构

关于图片的存放位置和`xmind`文件的使用方法，查看`/src/pages/backend/docker`的结构
