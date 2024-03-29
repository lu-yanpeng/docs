# 异步编程

> 参考：[fastapi](https://fastapi.tiangolo.com/async/) | [python官网](https://docs.python.org/zh-cn/3.11/library/asyncio.html)

::: tip
直接`await task()`并不会让出控制权，需要`task`内部执行的是IO操作才行。
:::


## 概念

### 异步

异步代码可以在等待一个IO操作的时候去执行另一个代码，比如在`fastapi`中，向数据库请求数据的时候就可以用异步请求，
这样在等待数据库返回数据的时候，服务器还可以处理其他的请求。如果是同步代码，就必须要等数据库返回数据才能处理下一个请求了。

异步编程适合IO密集型的任务，也就是有大量网络请求的这种，如果是CPU密集型异步就没用了，因为CPU一直在计算没有`await`的机会。
这种情况应该用多线程编程，让多个CPU核心分别处理这些计算。


### 并发 & 并行

**并发**是一种状态，指在同一时间内可以处理多个任务。就像去肯德基吃汉堡，一个收银员只要给顾客点完餐后就可以接待下一位顾客了，
这时候你只需要找个位置坐下等汉堡做好就行了。这种一个服务员可以接待多个客户并且每个客户都不需要等待的情况就叫并发，对应到fastapi中，
就是一个单线程的程序可以不间断的处理多个请求。

**并行**是指一种运行方式，多个线程同时运行一个程序就是并行。就像去银行取钱，有很多窗口也有很多工作人员，但是一个员工一次只能处理一个客户，
如果很多客户需要取钱为了加快速度就可以多开几个窗口。就像java中的多线程编程，一个线程处理一个请求，多个请求同时到来的时候就需要开多个线程。

并发在大量需要`await`的场景下表现更好，因为它免去了切换线程的开销。具体可以看[fastapi官网](https://fastapi.tiangolo.com/zh/async/#_8)

### 协程

异步函数返回的值就是协程，听起来比较高大上，和线程有点像，有些地方会把它成为`微线程`，但我觉得它只是一个可以被等待的任务而已，
本质上还是一个普通函数，如果协程中没有IO操作，它其实就是同步运行的普通函数。

一个协程不能被直接运行，可以使用`await`关键字来运行。
注意：单独`await`一个协程并不是异步的，它需要变成`task`在事件循环中运行才是异步

```python
async def main(): ...
# 直接调用一个异步函数它并不会执行，而是返回一个协程对象
main()
# 使用await关键字可以运行它
await main()
```

因为协程只能在异步函数中执行，所以我们启动一个异步项目的时候必须要有一个入口，通过它来管理其他任务，
可以通过`asyncio.run()`来运行主入口函数

```python
import asyncio

async def main():
    # 在这里调用其他异步任务
    ...

if __name__ == '__main__':
    # 这个函数可以直接运行一个协程，而不用await，这样就解决了协程不能在普通函数中运行的问题
    asyncio.run(main())    
```


### 可等待对象

python中有3中可等待对象`协程`，`任务`，`Future`。

**协程**就是可以被`await`执行的异步函数。

**任务**是通过`asyncio.create_task(main())`创建的对象，它其实就是一个协程被放进了事件循环中，他会被自动调用，并且是并行运行

**Future**是一种特殊的低层级可等待对象，表示一个异步操作的最终结果。（官网原话，不清楚是什么）



## 特点

### 让出控制权

直接等待一个协程并不会让出控制权，需要执行IO操作时才会

```python
async def task(who):
    print(f'开始 {who}')
    # 这里模拟一些耗时操作
    a = 1
    for i in range(0, 10000):
        a += a * i
    print(f'结束 {who}')
    
async def main():
    async with TaskGroup() as tg:
        # 他会顺序执行，不会让出控制权
        tg.create_task(task('aaa'))
        tg.create_task(task('bbb'))
```

上面这个示例会按顺序运行，先是第一个执行完才会执行第二个，虽然等待了这个任务，但是它本身并没有IO操作，不会让出控制权。

把这个案例改成IO操作的，他就会让出控制权，就会出现第二个任务先执行完的情况了

```python
async def task(who, d):
    print(f'开始 {who}')
    # 这里模拟一些耗时操作
    await sleep(d)
    print(f'结束 {who}')
    
async def main():
    async with TaskGroup() as tg:
        # 如果await sleep的时候会跳转到第二个任务继续执行
        tg.create_task(task('aaa', 2))
        tg.create_task(task('bbb', 1))
```


### 无序

多个任务的执行时间不一样，同时运行这些任务不能保证谁先执行完毕。


## 事件循环

在事件循环中可以运行协程，他们被打包成一个个的任务，遇到IO操作的时候就会跳到下一个任务去执行，这样就不会阻塞服务器了。
对应到`fastapi`就是一个路径函数就是一个任务，遇到请求数据库这样的IO操作，就会自动跳到下一个请求中去执行。

事件循环可以通过`asyncio.run()`来运行，并且一个线程中应该只有一个循环。实际开发不会手动创建事件循环，这是库作者需要操心的事。



## 并发运行

直接`await`一个协程并不是并发的，需要创建任务把他加入事件循环中，让系统来运行它，这样碰到IO操作的时候才会让出控制权去执行其他任务。

### 创建任务

`asyncio.create_task()`可以创建一个任务，然后`await`这个任务，他就会自动在事件循环中运行了。在不同位置创建的任务都会在同一个事件循环中运行

```python
import asyncio

async def main():
    task_a = asyncio.create_task(task())
    task_b = asyncio.create_task(task())
    # 需要等待这个任务，他才会真正开始执行
    await task_a
    await task_b
```

### 任务组

要并发运行任务，更推荐用任务组`asyncio.TaskGroup`，他会自动创建任务并且自动await执行。而且不同位置的任务组也是在同一个循环中运行

```python
import asyncio

async def main():
    # 这个with语句退出之后，通过tg创建的所有任务都会被自动按顺序执行
    async with asyncio.TaskGroup() as tg:
        tg.create_task(task())
        tg.create_task(task())
```



## 示例

这个示例的运行时间是3秒，它`await task()`只是简单的运行这个协程，并不是把他放进事件循环中运行。所以他会同步运行这两个协程

`asyncio.sleep`可以模拟IO操作，如果是`time.sleep`则不行

```python
from asyncio import run, sleep

async def task(d):
    await sleep(d)

async def main():
    await task(1)
    await task(2)

run(main())
```

下面把这两个任务加入到事件循环中，它的运行时间缩短到了2秒，实现了并发运行

```python
from asyncio import run, sleep

async def task(d):
    await sleep(d)

async def main():
    async with TaskGroup() as tg:
        tg.create_task(task(1))
        tg.create_task(task(2))

run(main())
```

这是一个更完整的示例，运行它可以更好理解异步

```python
from asyncio import sleep, run, TaskGroup, create_task


async def test():
    """
    等待一个协程是等待它执行结束并且返回一个值，
    如果协程中没有耗时的io操作，那么这个协程会同步执行完并返回结果
    期间并不会交出控制权
    """
    print('test')
    a = 1
    for i in range(0, 10000):
        a += a * i
    return 'test'


async def fake_update(d: int, who: str) -> str | None:
    print(f'{who}')
    await test()
    print(f'模拟io操作 {who}')
    await sleep(d)
    print(f'我是 {who}')
    return who


async def task_a():
    """
    等待一个协程，会先进入异步函数内部执行，如果函数内部遇到await就会等待它完成，
    并跳转到其他协程去执行
    """
    print('aaaaa')
    await fake_update(2, '任务a')
    # async with TaskGroup() as tg:
    #     tg.create_task(fake_update(3, '任务a'))
    #     tg.create_task(fake_update(1, '任务a2'))


async def task_b():
    print('bbbbb')
    await fake_update(1, '任务b')


async def main():
    print('开始')
    async with TaskGroup() as tg:
        tg.create_task(task_a())        
        tg.create_task(task_b())
    print('结束')


if __name__ == '__main__':
    # 不同位置创建的任务会在同一个事件循环中运行
    # await会等待协程执行完毕并获取到返回值，如果协程中没有耗时操作，那么它就相当于一个同步函数
    # 当一个协程没法立刻给出返回值的时候，事件循环就会执行下一个任务，一直循环到所有任务都执行完毕
    run(main())
```