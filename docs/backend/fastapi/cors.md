# 跨域资源共享 CORS

参考：[官方](https://fastapi.tiangolo.com/zh/tutorial/cors/) [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

下面这段代码允许所有域名的访问

```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # 支持的源的列表
    allow_origins=['*'],
    allow_credentials=True,
    # 支持的方法
    allow_methods=["*"],
    # 支持的请求头
    allow_headers=["*"],
)
```

生产的时候最好正确设置`allow_origins`，只允许自己的应用访问服务。

## 预检请求 Options

`Content-Type`类型是`application/json`就是非**简单请求**，这样的请求在第一次发送前会先发送一个预检请求，以确定是否符合跨域要求，如果不符合的话就不用把数据发过去，这样就不会给服务器造成太大压力了。