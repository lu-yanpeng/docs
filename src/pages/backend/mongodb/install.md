# 安装

## 使用Docker

```shell
docker run -d -p 27017:27017 --name mongo2 mongo --replSet rs0
```

`--replSet rs0`这个是参数，表示开启一个`rs0`的副本。这样这个数据库就可以直接使用事务了
