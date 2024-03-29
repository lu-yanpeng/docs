# 请求重试

请求失败后自动重试，一般会在**请求超时**的时候重试。

## axios-retry

安装：`pnpm add axios-retry`

直接调用这个函数就行，不需要导出。用法建议直接看[github](https://github.com/softonic/axios-retry)

```js
import axiosRetry from 'axios-retry'

// 第一个参数是axios实例
axiosRetry(instance, {
    // 重试次数
    retries: 1,
    // 返回true时才会重试
    retryCondition: (error) => {
        const { code, message } = error
        // 这里会在请求超时的时候返回true
        return code === 'ECONNABORTED' && message?.startsWith('timeout')
    },
    // 延迟
    retryDelay: (retryCount) => 1500,
    // 将请求延迟设置为针对每个请求，如果不设置true，就不能自动重试
    shouldResetTimeout: true,
    // 重试时会调用自动调用这个函数，用来通知用户
    onRetry: (retryCount, error, requestConfig) => {
        console.log('重试', retryCount, error, requestConfig)
    }
})
```

## 手写

参考：[github issues](https://github.com/axios/axios/issues/164#issuecomment-327837467) [掘金网](https://juejin.cn/post/6973812686584807432#heading-6)

最重要的是这段代码

```js
await new Promise((resolve) => {
    setTimeout(() => resolve(), RETRY_DELAY);
});
return instance(config);
```

它会等待定时器执行，调用`resolve()`之后才会执行后续代码，如果把定时器设置成40秒，在debugger模式下就可以看到它会等待40秒之后再执行重试。用`async`写法还不能做到必须等待定时器完成才执行后续动作。

```js
const MAX_RETRY = 1
const RETRY_DELAY = 1000

instance.interceptors.response.use((response) => response, async (error) => {
    const { config, message, code } = error    
    
    if (code === 'ECONNABORTED' && message?.startsWith('timeout') && config) {
        let { retryCount = 0 } = config

        if (retryCount < MAX_RETRY) {
            retryCount += 1
            config.retryCount = retryCount
            // 这里必须用Promise，用异步函数起不到这样的效果
            await new Promise((resolve) => {
                setTimeout(() => resolve(), RETRY_DELAY);
            });
            return instance(config);
        }
    }    
    throw new Error()
})
```