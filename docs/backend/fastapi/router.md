# 路由

应该在`api`目录统一创建接口，由单独的一个文件管理路由，`main.py`只需要从这个模块加载路由就行

项目结构
```txt
api
  - api_v1
    - user.py
  - api_router.pu
main.py
```

`api_router.py` 路由文件
```py
from fastapi import APIRouter
from .api_v1 import user, login

# 所有的路由都在这添加，统一在这里设置元信息
router = APIRouter()
router.include_router(user.router, prefix='/user', tags=['user'])
...
```

`main.py`

```py
from api import api_router

app.include_router(api_router.router)
```