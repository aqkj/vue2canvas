// 初始化组件
import Vue from '../vue'
/**
 * 初始化组件
 * @param vm vue对象
 */
export function initComponents(vm: Vue) {
  resolveComponents(vm)
}
/**
 * 解析组件
 * @param vm vue对象 
 */
function resolveComponents(vm: Vue) {
  const components = vm.$options.components || {} as Record<string, any>
  Object.keys(components).forEach(name => {
    const options = components[name]
    if (typeof options === 'object') {
      const comp = vm.extend(options)
      ;(vm.$components as any)[name] = comp
    }
  })
}