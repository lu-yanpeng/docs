# 一些示例


**ResponseModel** 通用的fastapi response_model模型

```py
from typing import Generic, TypeVar
from pydantic.generics import GenericModel

# 类型变量，用在泛型中传递什么类型，上下文中就是什么类型
# 比如下面这个类，如果T是str类型，那么data就是str类型
T = TypeVar('T')

class ResponseModel(GenericModel, Generic[T]):
    status: int = 200
    msg: str = 'ok'
    data: T | None = None
```

用的时候只需要指定data的类型，并且在返回的数据中指定data就行了

```py
@router.get('/info', response_model=ResponseModel[UserInfo])
async def get_user_info(user: UserAllFields = Depends(get_current_user)):
    # 返回用户更多信息
    return {'data': user}
```