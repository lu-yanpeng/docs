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