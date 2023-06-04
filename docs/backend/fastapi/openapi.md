# API文档

fastapi提供了两个api文档，启动后访问`/docs`和`/redoc`就会看到所有接口了，一般访问`/docs`比较多，因为他是交互式的，可以直接在页面上请求接口并看到返回的数据。

文档需要用到`Swagger UI`来加载样式，官方设置了一个国外的CDN，国内访问经常超时，下面这段代码可以换一个CDN让访问更快速

```py
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html

app = FastAPI(docs_url=None)

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.root_path+app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.root_path+app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-bundle.js",
        swagger_css_url="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui.css",
    )
```