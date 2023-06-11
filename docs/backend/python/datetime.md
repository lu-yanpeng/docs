# 日期和时间的处理

返回带时区的UTC时间，这个可以在不同地区的服务器都能获得相同的时间。下面代码返回的是北京时间

```py
from datetime import datetime, timezone, timedelta

create_time: datetime = datetime.now(timezone(timedelta(hours=8)))
```

`datetime`对象按格式返回字符串，支持的格式在[这里](https://docs.python.org/zh-cn/3.10/library/datetime.html#strftime-and-strptime-behavior)

```py
create_time.strftime('%Y-%m-%d %H:%M:%S')
>>> '2023-05-31 18:26:59'
```