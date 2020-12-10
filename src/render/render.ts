// 渲染方法

import { createElement, RealElement } from "./element"
import * as components from './components'
import Vue from "../vue"
const renderComponents: Record<string, any> = components
// 原生组件名称
export const renderComponentNames: string[] = Object.keys(components)
// 保存elements
export let elements: any[] = []
/**
 * 渲染方法
 * @param {RealElement} element 元素
 */
export function firstRender(vm: Vue, ele: RealElement) {
  elements = []
  // vm.$children = []
  render(vm, ele)
}
export function render(vm: Vue, element: RealElement) {
  // elements = []
  // 渲染组件
  componentsRender(vm, element)
}
/**
 * 静态渲染
 * @param index 
 */
export function renderStatic(this: Vue, index: number) {
  const staticRenderFns = this.$options.staticRenderFns
  if (staticRenderFns) {
    const render = staticRenderFns[index]
    return render.call(this, createElement.bind(this))
  }
}
/**
 * 渲染方法
 * @param {RealElement} element 元素
 */
// function componentsRender(vm: Vue, element: RealElement) {
//   const renderComponentsFunc = renderComponents[element.type]
//   if (renderComponentsFunc) return renderComponentsFunc(element, vm)
//   else return renderComponents['div'](element, vm)
// }
function componentsRender(vm: Vue, element: RealElement) {
  const renderComponentInstance = getComponentInstance(vm, element)
  if (renderComponentInstance) {
    elements.push(renderComponentInstance)
    renderComponentInstance.render()
  }
}
/**
 * 获取元素实例
 * @param element 
 */
function getComponentInstance(vm: Vue, element: RealElement) {
  // 判断是否存在构造函数
  // if (!element.Ctor) {
  const renderComponentsFunc = renderComponents[element.type]
  if (renderComponentsFunc) return new renderComponentsFunc(element, vm)
  else return new renderComponents['div'](element, vm)
  // } else { // 如果类型是对象
  //   const Ctor = element.Ctor
  //   const vmComp = new Ctor() as Vue
  //   vm.$children.push(vmComp)
  //   vmComp.$mount()
  // }
}
