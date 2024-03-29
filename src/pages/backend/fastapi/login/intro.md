# 介绍

这里用的是fastapi提供的方法来实现的登录，有些地方可能和传统的登录不同。

## 登录流程

1. 用户通过前端表单提交用户名和密码。
2. 把请求发送到`tokenUrl="token"`指定的api处理。就是发到`OAuth2PasswordBearer(tokenUrl="/login")`这个依赖项指定的url处理，这里会发到`/login`这个接口。
3. api检查用户名和密码，并返回`token`给前端。
4. 前端保存这个`token`，可以保存在`lolocalStorage`里面。
5. 每次请求的时候都要带上这个token。

## 关于token

- token要放在`Authorization`请求头中发送。
- 这里用的是**Bearer**令牌，格式 Bearer + token
    - 一个完整的token看起来像这样
- token一般会设置过期时间，到期后再用这个token来请求就不通过。


## 依赖

`python-multipart`用来解析表单的数据。

OAuth2协议规定账号密码必须通过表单提交，所以这里需要安装解析表单数据的库。

```shell
pip install python-multipart
```

## OAuth2PasswordBearer

`OAuth2PasswordBearer`作为依赖项执行后只有两种结果
- 返回请求头中的token
- 报错并返回401响应

添加这个类后，OpenApi会自动添加一个登录的窗口，可以用来测试登录。这个功能是fastapi自动添加的，不需要额外的设置。

导入

```py
from fastapi.security import OAuth2PasswordBearer
```

**tokenUrl**

::: tip
在OpenApi页面点击右上角的登录测试的话，会通过`tokenUrl`指定的接口来登录，所以这个参数实际只会在openapi登录测试的时候用到，不影响正常开发。
:::

这个类需要指定`tokenUrl`，指定一个api来处理登录请求并返回token。你需要自己写一个`/login`接口放到这里接收用户名密码并返回token。

因为这个类实现了`__call__`方法，所以它的实例可以当作依赖项使用。

这个类的作用：
- 验证请求头是否包含`Authorization`字段。
- `Authorization`字段是否以`bearer`开头

如果不符合以上要求会直接返回401，这里从源码可以看出来。

示例

```py
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

请求`/items`的时候会先执行`oauth2_scheme`依赖，判断是否有token，如果没有token或token不符合规则直接返回401。

## 登录接口

根据规范，登录接口必须返回一个json，必须有`access_token` 和 `token_type`字段。

## 401

任何因为未认证返回的401响应都应该携带`WWW-Authenticate`字段。这是规范的一部分，不带也不会报错，以后可能会有用最好还是带上。

```py
raise HTTPException(
            status_code=401,
            detail="无效token",
            headers={"WWW-Authenticate": "Bearer"},
        )
```