# 介绍

## 示例

创建虚拟环境

```shell
py -m venv .venv
cd .venv/Scripts
./activate
```

安装依赖

```shell
pip install fastapi
# 安装适合python的标准版本
pip install "uvicorn[standard]"
```

创建`main.py`

```py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"msg": "Hello World"}

if __name__ == '__main__':
    from uvicorn import run
    run('main:app', reload=True)
```

启动。注意要先打开虚拟环境

```shell
uvicorn main:app --reload
# 或者
py main.py
```

api文档：localhost:8000/docs