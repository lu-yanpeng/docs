# 依赖

依赖项会在运行时由系统自动调用，比如在处理请求前获取数据库session，根据token获取当前用户


## 示例

`/`这个接口在执行前会自动调用`get_current_user`获取当前用户并返回，路由函数只需要指定`Depends(get_current_user)`
就行了，它能保证返回正确的数据，否则返回HTTPException

```py
async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserAllFields:
    """
    根据token获取当前登录用户，用在依赖函数
    :param token:
    :return:
    """
    exception401 = HTTPException(
        status_code=401,
        detail="token失效",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        key: str = payload.get('sub')
        if not key:
            raise exception401
    except JWTError:
        raise exception401

    return get_user_by_key(key=key)
    
@app.get('/')
async def index(user: User = Depends(get_current_user)): ...
```

## 验证返回数据

因为在使用依赖时不能保证依赖项返回的格式，所以建议在每个依赖返回前都用pydantic格式化一下数据。

```py
class UserInfo(BaseModel):
    id: int
    name: str
    
def get_user_info(token: str):
    # 从数据库获取用户数据，用pydantic过滤只保留id和name
    user = db.get(kye)
    return UserInfo(**user)
```

这样在用这个依赖的时候就能保证数据的格式了，不过要注意这里返回的是pydantic模型，如果需要dict可以用`.dict()`返回