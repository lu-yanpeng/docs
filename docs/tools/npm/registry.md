# 替换国内源

[参考](https://zhuanlan.zhihu.com/p/623547625)

## npm

```shell
// 查询源
npm config get registry

// 更换国内源
npm config set registry https://registry.npmmirror.com

// 恢复官方源
npm config set registry https://registry.npmjs.org

// 删除注册表
npm config delete registry
```


## yarn

```shell
// 查询源
yarn config get registry

// 更换国内源
yarn config set registry https://registry.npmmirror.com

// 恢复官方源
yarn config set registry https://registry.yarnpkg.com

// 删除注册表
yarn config delete registry
```
