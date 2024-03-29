# 常见问题



## 第三方库无类型

一些比较旧的js项目没有ts类型声明文件，在使用的时候会提示类型错误，比如`axios`。或者是通过CDN的方式引入包，没有类型
也很不好用，比如CDN引入`echarts`

这时候可以到[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)查找是否有别人写好的类型声明，
在`types`目录下搜索一下，如果有的话就可以通过npm安装类型包，这样就不会报错了

```shell
# echarts的第三方类型
pnpm add -D @types/echarts
```