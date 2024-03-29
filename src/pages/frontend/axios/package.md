# 封装

示例

```js
import axios from 'axios';
import router from "@/router";
import {useUserStore} from '@/pinia-stores/user'
import { Message } from '@arco-design/web-vue'


const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    // 返回true表示正常响应，false控制台会报错
    validateStatus: (status) => {
        // 状态码小于500的正常响应
        return status < 500
    }
});

instance.interceptors.request.use(
    (config) => {
        // 所有请求加上请求头
        const userStore = useUserStore()
        config.headers['Authorization'] = 'bearer ' + userStore.access_token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

// 最大重试几次
const MAX_RETRY = 1
// 延迟重试，失败后立即重试会增加服务器负担
const RETRY_DELAY = 300
// 添加响应拦截器
instance.interceptors.response.use(
    async (response) => {
        const userStore = useUserStore()
        const { status, data = {} } = response

        if (status >= 400 && status < 500) {
            switch (status) {
                case 400:
                    // 登录页面已经有显示错误信息了，不用再显示
                    if (response.config.url !== '/login') {
                        Message.error(data.msg ?? '未知错误')
                    }
                    break
                case 401:
                    Message.error('请重新登录')
                    userStore.logout()
                    await router.replace({name: 'login'})
                    break
                case 403:
                    await router.push({name: '403Main'})
                    break
                // case 405: // 请求方法用错了，比如需要get请求，结果用的是post
            }
            throw new Error(data.msg ?? '未知错误')
        }
        return data
    },
    async (error) => {
        const { config, message, code, response } = error

        // 请求超时重试
        if (code === 'ECONNABORTED' && message?.startsWith('timeout') && config) {
            let { retryCount = 0 } = config
            if (retryCount < MAX_RETRY) {
                retryCount += 1
                config.retryCount = retryCount
                await new Promise((resolve) => setTimeout(() => resolve(), RETRY_DELAY))
                return await instance(config)
            }
        }

        // 500响应
        if (response) {
            const { data = {} } = response
            error.message = data?.msg ?? '服务器错误'
            await router.push({name: '500Main'})
        }
        throw error
    }
);

export default instance;
```