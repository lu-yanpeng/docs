# 事务

要启用事务，数据库必须要开启副本集或集群，否者事务会报错。参考[开发时使用副本集](https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/)

在插入或删除数据的时候，传递`session`属性，会自动开启事务，只要某一条语句失败或代码报错，传递了`session`的操作都不会成功。[参考](https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_client_session.html)

```python
async def main():
    async with await client.start_session() as s:
        async with s.start_transaction():
            # 插入时传递session，自动开启事务
            await users_tables.insert_one({'name': '张三'}, session=s)
```