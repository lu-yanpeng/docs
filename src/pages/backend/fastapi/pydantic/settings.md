# 读取环境变量

用这个来读取环境变量非常方便，一般会设置数据库密钥和jwt key，.env文件只在本地配置不上传到仓库，这样会比较安全

## 示例 

创建`env.py`文件，统一在这里读取环境变量

```py
from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_KEY: st

    # 读取项目下的.env文件
    class Config:
        env_file = '.env'

settings = Settings()
```

`.env` 环境变量文件一般放在项目根目录下，方便修改。注意文件名要跟模型的`Config`配置保持一致，否则读取不到

```txt
DB_KEY = "123"
```

使用

```py
from env import settings

settings.DB_KEY
```