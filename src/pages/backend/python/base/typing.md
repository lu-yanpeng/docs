# 类型提示

参考：
- [fastapi类型提示介绍](https://fastapi.tiangolo.com/zh/python-types/)
- [mypy的介绍](https://mypy.readthedocs.io/en/latest/cheat_sheet_py3.html)
- [官网](https://docs.python.org/zh-cn/3/library/typing.html)

::: tip
这里用的是`python3.11`版本。
:::

## 常用类型

### 普通类型

```py
# 普通类型就像这样指定就行了
x: int = 1
x: float = 1.0
x: str = 'test'
x: bool = True
x: bytes = b'test'

# 可以只定义类型不给值，这样只要不调用就不会报错
x: int  # 表示x是int类型，
```

### 泛型

> 泛型就是一个类型在创建的时候不指定具体类型，在调用时候再传递类型。根据传递的值不同，返回不同的类型。

泛型类似函数，函数接收值然后返回处理过的值，泛型接受一个类型返回一个具体的类型。泛型本身是一个类型，就像`list`可以直接用来指定变量类型，同时它也可以用`[]`指定里面元素的类型；`list[int]`组合在一起就是一个具体的类型

泛型可以通过`[]`指定里面的类型，下面这些是内置泛型。

```py
# list[int] 表示一个list，里面有一个元素类型是int
# 这里存在疑问，列表是不是只需要指定一个元素，还是需要 ... 来指定可变的元素
x: list[int] = [1]
x: set[int] = {6}

# dict[str, int] 表示一个字典，里面每个key都是str，value都是int
x: dict[str, int] = {"field": 1}

# 这个元组指定了3个元素，表示它是有固定长度的，和上面的list一样
x: tuple[int, str, float] = (3, "yes", 7.5)

# 不定长度的可以用 ... 表示
x: tuple[int, ...] = (1, 2, 3)
# 定义一个空的元组
x: tuple[()] = tuple()
```

### 联合类型和可选类型

```py
# x可以是这3个类型任意一个
x: int | str | float = 1

# 如果一个类型很长，可以用别名
Alias = int | str | float
x: Alias

# 可选类型就是有一个值是None而且默认值是None的联合类型
class Var:
    x: int | None = None
x: Var = 1
```

### Any

不知道是什么类型可以用Any表示

```py
from typing import Any

# 这个函数可以返回任意类型的数据
def test() -> Any: ...
```

## 使用

### 函数中

在函数里面可以指定接收参数的类型，返回值的类型也可以指定。在开发中强烈建议每个函数都指定正确的参数和返回值类型。

```py
# 这个函数接收一个int，返回一个str
def test(num: int) -> str:
    return str(num)

# 指定返回值为None
def test() -> None:
    print('hello world!')

# 如果没有指定参数的类型，那么它会被当做Any类型
# 实际开发最好每个参数都指定类型
def test(x):
    # 这里x是Any类型
    return x.index
```


## 高级

### 类注释

用类来给变量做注释，这样就表示这个变量是这个类的实例。实际开发中可能会用`pydantic`模型来代替手写类，因为pydantic会自动校验每一个参数的类型是否正确，还可以手动校验值。

```py
class A:
    def __init__(self, a: int, b: str) -> None:
        self.a = a
        self.b = b

# 表示a是A的实例，它里面也会有这些属性
a: A
```

可以用类变量来注释，这里不要跟`pydantic`里面的模型搞混了，这里只是一个普通的类，没有指定`__init__`方法。pydantic模型会自动生成__init__方法。

```py
class A:
    # 只指定了类型没有给值，不会报错
    a: int
    b: str

# 表示a是一个有a,b两个属性的类型
a: A

# 注意！这里A只定义了类型，没有指定属性的值，如果用来实例化的话，访问不到里面的属性
a = A()
a.a  # 报错
```

### 可调用类型 Callable

> 语法：`Callable[[参数], 返回值]`。必须同时指定参数和返回值

`Callable`表示一个可调用的函数

```py
from typing import Callable

# 表示test是一个可调用的函数，接收int类型的参数返回str
test: Callable[[int], str]

# 没有参数或者不想指定参数类型，可以用...代替，这时候就不用 []
test: Callable[..., int]
```

### 向前引用

> [参考mypy](https://mypy.readthedocs.io/en/latest/runtime_troubles.html)

因为python是顺序执行的，如果一个变量在还没有执行的时候被引用就会报错，也就是向前引用报错。在定义类型的时候可能会出现向前引用的情况，一个类型定义在实际参数的后面了。

```py
# 这里会运行失败，因为A定义在test函数的后面，没有声明就被引用会报错
def test(a: A): ...
class A: ...
```

可以用`annotations`来解决，只要导入这个方法，在当前文件中就可以向前引用。

**原理**：因为一个类型实际在执行的时候会被注释掉，只有在代码启动的时候才会检查变量的类型，这里就相当于告诉编辑器这个变量定义在了当前文件的其他位置，检查的时候不要报错。

```py
from __future__ import annotations

# 即使A定义在了后面
def test(a: A): ...
class A: ...

# 也可以用 '' 来注释类型
# 这样向前引用也不会报错
def test(a: 'A'): ...
class A: ...
```

### 自定义泛型 Generic

> 泛型：传递什么类型它里面的属性就是什么类型

内置的泛型就是list、dict这些，可以用`[]`来传递类型。建议用`pydantic`来创建泛型。

```py
from typing import Generic, TypeVar

T = TypeVar('T')
class A(Generic[T]):
    def __init__(self, a: T, b: str) -> None:
        self.a = a
        self.b = b
        
# test是A类型，并且属性a是float类型
test: A[float]  # float就表示a的类型
```

`Generic`是一个特殊的类它实现了[`__class_getitem__()`](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__class_getitem__)
继承它的类可以用`[]`的方式调用，调用之后他会返回一个类型别名，用来给变量指定类型

### 类型变量 TypeVar

> 一个专门用来指定类型的变量，如果一个变量指定为`TypeVar`类型，那么它的实际类型应该通过调用的时候在[]里面指定。很少单独使用这个类型，一般会和泛型一起使用。

用法：
1. `名称 = TypeVar('名称')`， 这里实例的名称必须和这里保持一致
2. `名称 = TypeVar('名称', bound=str)`，bound指定他的类型必须是str
3. `名称 = TypeVar('A', str, int)`，他的类型可以是str或int

**注意**，不要直接给变量指定为TypeVar类型，应该先实例化然后通过实例来给变量注释。

```py
from typing import TypeVar, Generic

# 没有指定类型，T就表示任意类型
T = Type('T')
# 指定的时候需要传递类型，这里a就是str
a: T[str]

# 在泛型中用类型变量是更常见的用法
class A(Generic[T])
    def __init__(self, a: T): ...
```

### 数据类 dataclass

> 用来装饰一个类，可以自动生成带类型注释的`__init__`方法。

它可根据类变量自动生成带类型注释的__init__方法，这样的用法更接近pydantic的模型了，看起来只是定义了类变量，但是自动生成了实例属性。
还可以自动生成很多其他方法，在[官网](https://docs.python.org/zh-cn/3/library/dataclasses.html#module-contents)有介绍。

这种类一般只用来存数据（所以叫dataclass），不写其他方法，单纯的只写字段，就像一个orm模型一样。

```py
from dataclasses import dataclass

@dataclass
class A:
    # 自动根据类变量生成实例属性
    a: int = 1  # 可以指定默认值
    b: str
```

上面这个类会自动转成下面这个样子

```py
class A:
    def __init__(self, a: int = 1, b: str):
        self.a = a
        self.b = b
```

### Literal 字面量

用来给有明确值的字面类标注类型

```py
S = Literal['1', '2', '3']
# s只能是1 2 3 其中一个
s: S = '1'
```

### type 类

如果希望一个变量是某个类本身，或它的子类，而不是他的实例，就可以用`type`

```py
class Tags: ...
class PageTags(Tags): ...

# 指定t为这两个类本身，而不是他们的实例
t: type[Tags] = PageTags
# 相当于 PageTags()
t()
```
