# pip 包管理工具

参考：[pip 官网](https://pip.pypa.io/en/stable/topics/configuration/)

这个命令可以查看配置文件的位置，一般配置全局[global]就行了，需要的话也可以按不同用户单独指定。

```shell
pip config debug
```

配置文件的写法，[命令] + 选项 + 选项值。配置文件里面的选项不需要加`--`，它和命令的选项一一对应，所有命令和选项在[这里](https://pip.pypa.io/en/stable/cli/)查看。

```txt
[command]
option: 值
```

比如现在要配置`install`命令的`--index-url`选项，就可以这样写

```txt
[install]
index-url: https://pypi.tuna.tsinghua.edu.cn/simple
```

这样每次使用install命令的时候都会自动加上`--index-url`选项了。[global]表示全局配置，如果同时配置了单个命令和global，会优先使用单个命令的配置。



## 下载源

很多时候会下载超时，最好全局指定国内的下载源，这里需要修改pip的配置文件，不同系统文件位置不同。

### 全局指定

**windows**

打开`pip.ini`，如果没有可以手动创建，注意：他是一个隐藏文件。

```shell
C:\ProgramData\pip\pip.ini
```

写入配置

```txt
[install]
index-url: https://pypi.tuna.tsinghua.edu.cn/simple
```

现在pip不允许`http`协议的源了，推荐下载源都指定`https`的。非要`http`的话可以配置

```txt
[global]
trusted-host: 源地址
```

**linux**

待补充...

### 临时指定

使用install的`-i`选项可以单独指定这次下载的源

```shell
pip install fastapi -i https://pypi.tuna.tsinghua.edu.cn/simple
```



## 导出 requirements.txt

**windows**

```shell
# 导出
pip freeze > requirements.txt
# 安装
pip install -r requirements.txt
```

**linux**

```shell
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```