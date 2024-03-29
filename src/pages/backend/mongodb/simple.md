# 基础操作

这里用python的[motor](https://motor.readthedocs.io/en/stable/tutorial-asyncio.html)库来操作数据库

```shell
pip install motor
```

## 连接数据库

创建数据库和表都不需要`await`，当执行sql操作的时候，如果没有这个表会自动创建

```python
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

# 客户段
client = AsyncIOMotorClient('mongodb://127.0.0.1:27017', server_api=ServerApi('1'))
# 数据库
my_api_db = client['my-api']
# 表
users_tables = my_api_db['users']
```

## 查询

查询可以单个查询，也可以用聚合查询返回一个游标对象，遍历它来查询

### find_one()

查询单个记录，返回值是一个dict，需要用`await`来调用

```python
# 查询users表中，name=张三的数据
result = await users_tables.find_one({'name': '张三'})
```

### aggregate()

聚合查询指定更多的条件，比如连表操作，还能直接在数据库遍历某个字段

```python
# 聚合查询返回的是一个游标对象，还需要进一步遍历才能获取到值
result = users_tables.aggregate([{'$match': {'$in': id_list}}])
async for r in result:
    print(i)
```
