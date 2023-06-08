import { ref, watchEffect } from 'vue'

// 用来取消一个请求
export const useAbortController = () => {
    // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
    const aborted = ref(false)
    // 保存AbortController的实例
    const ac = ref(new AbortController())


    // 触发abort事件时调用的回调
    const fn = () => aborted.value = true

    watchEffect(() => {
        if (aborted.value) {
            // 需要重新生成AbortController实例
            ac.value = new AbortController()
            aborted.value = false

            ac.value.signal.addEventListener('abort', fn, {once: true})
            return ac.value
        }
        return ac.value
    })

    // 请求被取消时自动触发这个事件，因为signal只能使用一次，所以这里可以设置成一次性事件
    ac.value.signal.addEventListener('abort', fn, {once: true})

    return { ac }
}