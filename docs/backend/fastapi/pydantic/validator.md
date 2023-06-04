# 自定义验证器

参考：[官网](https://docs.pydantic.dev/latest/usage/validators/)。
验证器可以对字段进行验证，比如字符串长度或者验证字符串格式，手机号码、邮箱之类的。

示例，验证name字段长度，小于3就报错

```py
from pydantic import BaseModel, validator, ValidationError

class User(BaseModel):
    name: str
    
    
    @validator('name')
    def name_(cls, v):
        if len(v) < 3:
            raise ValidationError
        return v
```

验证器必须要返回一个值，或者引发一个错误，在内部可以用断言`assert`

## 验证多个值

一个验证器可以用来给多个字段验证，传入`*`可以对所有字段验证，`pre=True`可以让这个字段始终第一个调用

```py
@validator('name', 'uid', 'pwd', pre=True)
def name_(cls, v): ...        
```

## 始终验证

如果字段没有显示传值，那他的验证器不会被触发，可以`always=True`设置始终触发

```py
class Test(BaseModel):
    name: str | None = None
    
    @validator('name', always=True)
    def name_(cls, v): ...
```

这里name有默认值None，初始化的时候没有传递name他的验证器就不会触发，设置`always=True`就可以正常触发。
