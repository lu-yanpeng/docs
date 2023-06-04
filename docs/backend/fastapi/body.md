# 请求体参数

在路径函数中，给一个形参声明为pydantic模型类型，这个参数就会自动变成请求体参数。

```py
class UserBase(BaseModel):
    id: int
    name: str

@app.get('/')
async def index(user: UserBase): ... 
```

这样声明之后就能保证收到的数据的格式了，他会自动过滤并且转换成对应的类型，需要注意的是过滤后的数据是pydantic实例
不是`dict`，可以用`.dict()`方法转成字典。

```js
// 收到的数据
{"id": "123", "name": "admin", "phone": "151111"}
// 转换后过滤掉多余字段，而且id也变成int类型了
{"id": 123, "name": "admin"}
```

使用依赖项时要注意，形参的类型由依赖项的返回值决定，这里声明类型不会过滤数据

```py
def get_current_user():
    return {'id': 1, 'name': 'test'}
    
@app.get('/')
# user的类型由get_current_user返回值决定
async def index(user: UserBase = Depends(get_current_user)): ...     
```

`user`的类型是`get_current_user`的返回值，这里声明`UserBase`只是普通的类型声明，不会过滤数据（[官方说明](https://fastapi.tiangolo.com/zh/tutorial/dependencies/classes-as-dependencies/#vs-depends)）。
为了保证数据的格式，建议在依赖项返回前用pydantic模型过滤一下，上面的例子可以改成这样


```py{3}
def get_current_user():
    # 返回数据前用模型过滤一下
    return UserBase(**{'id': 1, 'name': 'test'})
    
@app.get('/')
async def index(user: UserBase = Depends(get_current_user)): ...
```
