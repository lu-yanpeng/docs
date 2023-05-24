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

`root_path_in_servers=False`，在openapi里面测试接口的时候默认会给请求加上前缀，因为本地开发的时候没有代理服务器所以也没有前缀，这样会访问失败。可以加上这个配置，这样在openapi测试的时候就不会加上前缀。建议只在本地开发的时候用

## 说明

建议部署的时候再加上这个配置

加上这个配置不会影响fastapi的路由处理，比如`/api/user`这个路径会被`/user`处理，因为fastapi已经把前缀`/api`去掉了，处理函数接收到的路径就是`/user`

如果自己手动设置了`/docs`路由，需要正确设置`openapi_url`，否则访问不到`openapi.json`

```py
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        # 这样如果设置了root_path也可以正确返回openapi.json
        openapi_url=app.root_path+app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.root_path+app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-bundle.js",
        swagger_css_url="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui.css",
    )
```