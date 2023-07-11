# 示例


## nginx

用`nginx`快速代理一个vue3项目

```yml
version: "3"
services:
  blog:
    image: vue3-blog:latest
    build: .
    ports:
     - "4173:80"
```

```docker
# alpine版本的是比较小的版本，正常部署就用这个版本
# AS build表示把这层FROM的结果保存起来，可以在其他的FROM里面引用
# 这样的好处是可以让最终镜像的包很小，因为这里node只需要打包vue，最后运行是通过nginx
# 所以只要拿到打包好的文件，在nginx环境里面运行就行了，这一层的内容都不需要
FROM node:18-alpine AS build
# 设置工作目录，后续只要是这个FROM模块内的炒作都在这个目录下进行
WORKDIR /blog/
# 复制文件，这里是分层复制，不是一次复制全部文件，这样在后续重新构建镜像的时候就会用缓存
COPY ./blog/package.json ./blog/pnpm-lock.yaml ./
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install -g pnpm \
    && pnpm install
# 把vue文件复制过来，这里应该设置.dockerignore文件来过滤掉不想复制的文件
COPY ./blog .
RUN pnpm build

FROM nginx:1.25-alpine
# 从上一个build这个环境里面复制内容，也就是把打包好文件拿过来
COPY --from=build /blog/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx" , "-g", "daemon off;"]
```