import { ref, toRef } from 'vue'

export const useAbortController = () => {
  // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
  const aborted = ref(false)

  const _ctrl = ref(new AbortController())

  const _listen = () => {
    _ctrl.value.signal.addEventListener('abort', () => (aborted.value = true), { once: true })
  }
  _listen()

  const getAc = () => {
    if (aborted.value) {
      _ctrl.value = new AbortController()
      aborted.value = false
      _listen()
      return _ctrl.value
    }

    return _ctrl.value
  }

  // 一个只读的对象，每次访问.value的时候都会执行getAc获取最新的值
  const ac = toRef(() => getAc())

  return {
    ac
  }
}