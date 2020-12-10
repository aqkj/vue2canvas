// 初始化data
import Vue from '../vue'
/**
 * 初始化data
 * @param vm vue实例
 */
export function initData(vm: Vue) {
  let data = vm.$options.data
  if (!data) return
  const _data = vm.$data = typeof data === 'function' ? data(vm) : data
  Object.keys(_data).forEach(key => {
    (vm as any)[key] = _data[key]
  })
}