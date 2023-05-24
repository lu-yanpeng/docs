# 配置

> [参考](https://cn.vitejs.dev/config/)

## server.host

设置为`true`或者`0.0.0.0`，可以监听所有ip

```js
export default defineConfig({
  ...
  server: {
    host: true
  },
  ...
})
```