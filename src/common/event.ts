// 公用事件

/**
 * 元素事件
 */
interface IListener {
  name: string,
  callbacks: CallableFunction[]
}
export class EventTrigger {
  /** 监听数组 */
  private $listeners: IListener[] = []
  constructor() {}
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 参数
   */
  $emit(eventName: string, ...args: any[]) {
    let result = false
    this.$listeners.forEach(listener => {
      if (listener.name === eventName) {
        listener.callbacks.forEach((callback: any) => {
          const _result = callback.call(null, ...args)
          result = result || _result
        })
      }
    })
    return result
  }
  /**
   * 移除对应事件
   * @param eventName 事件名
   * @param callback 事件回调
   */
  $off(eventName: string, callback?: CallableFunction) {
    const listener = this.$listeners.find(listener => listener.name === eventName)
    if (listener) {
      const index = listener.callbacks.findIndex(cb => cb === callback)
      listener.callbacks = []
    }
  }
  /**
   * 监听事件
   * @param eventName 事件名
   * @param callback 事件回调
   */
  $on(eventName: string, callback: CallableFunction) {
    const listener = this.$listeners.find(listener => listener.name === eventName)
    if (listener) {
      (listener.callbacks || (listener.callbacks = [])).push(callback)
    } else {
      this.$listeners.push({
        name: eventName,
        callbacks: [callback]
      })
    }
  }
}