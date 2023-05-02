# 请求前缀

部署程序一般会用前缀区分不同的应用，`/`根路径会直接访问到前端页面，`/api`一般表示后端api应用，`/admin`表示后台管理系统。

nginx通过前缀把请求转发给不同的应用处理，这时候fastapi收到的所有请求都会有`/api`前缀，这样会导致匹配不到路由报错404。可以用`root_path`来去掉前缀。

## uvicorn 中处理

启动应用的时候由`uvicorn`来处理前缀，只需要添加`--root-path`即可。

```shell
uvicorn main：app --root-path /api
```

## FastAPI 中处理

有时候不方便在`uvicorn`处理或者用的是别的服务器，这样可以在fastapi里面处理，创建app的时候传递`root_path`参数就行了。

```python
app = FastAPI(root_path="/api")
```

## 说明

建议部署的时候再加上这个配置

加上这个配置不会影响fastapi的路由处理，比如`/api/user`这个路径会被`/user`处理，因为fastapi已经把前缀`/api`去掉了，处理函数接收到的路径就是`/user`