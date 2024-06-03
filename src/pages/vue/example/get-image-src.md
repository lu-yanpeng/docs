# 动态获取图片路径

> 根据文件名，动态获取图片。[参考](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)

下面这段代码会把路径做转换，输出 `http://localhost:4173/assets/xx.png` 这样格式的字符串。注意，只有在vite环境中才会生效，
因为vite会静态分析这个路径，转换成打包后的路径

```ts
// img-src.ts
export const getImgSrc = (name: string) => {
  // 这里必须以字符串开头，可以是相对路径，也可以是/src的绝对路径
  // 如果路径也用变量，vite在打包时不会做路径转换，这段代码也就失效了
  return new URL(`./${name}`, import.meta.url).href
}
```

推荐把这个文件放在img路径下，也就是跟图片放在一起，这样任意组件都可以很方便的调用这个方法。
