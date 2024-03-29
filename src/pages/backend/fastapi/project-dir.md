# 项目结构

一个完整的`FastAPI`项目目录结构，这里参考了官方项目和一些优秀的开源项目。

```text
├── app
│   ├── .venv
│   ├── api
│   ├── core
│   ├── crud
│   ├── db
│   ├── schemas
│   ├── .env
│   ├── requirements.txt
│   ├── README.md
│   ├── __init__.py
│   ├── main.py    
```

说明
- .venv: 虚拟环境，在本地开发时使用，`py -m venv .venv`可以创建。
- api: api接口存放目录。
- core: 一些核心的功能，比如环境变量，密码校验等。
- crud: 在这里操作数据库。
- db: 在这里连接、创建数据库模型。
- schemas: pydantic模型。
- main.py: 每一个项目都必须有一个入口文件，建议使用`main.py`这个文件作为入口。

一个更大的全栈项目

```text
.全栈项目
├── backend
│   ├── app
├── frontend
│   ├── blog
├── README.md
```