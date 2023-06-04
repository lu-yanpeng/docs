# 虚拟环境

## windows

windows创建虚拟环境，在当前目录下创建`.venv`的虚拟环境

```shell
py -m venv .venv
```

激活

```shell
cd .venv/Scripts
./activate

# 退出
deactivate
```

## linux

创建

```shell
python3 -m venv ./.venv
```

激活

```shell
cd .venv/bin
source ./activate

# 退出
deactivate
```