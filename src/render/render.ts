// 渲染方法

import { createElement, VueElement } from "./element"
import * as componets from './components'
import Vue from "../vue"
const renderComponents: Record<string, any> = componets
// 保存elements
export let elements: any[] = []
/**
 * 渲染方法
 * @param {VueElement} element 元素
 */
export function firstRender(vm: Vue, ele: VueElement) {
  elements = []
  render(vm, ele)
}
export function render(vm: Vue, element: VueElement) {
  // elements = []
  // 渲染组件
  componentsRender(vm, element)
}
/**
 * 渲染方法
 * @param {VueElement} element 元素
 */
// function componentsRender(vm: Vue, element: VueElement) {
//   const renderComponentsFunc = renderComponents[element.type]
//   if (renderComponentsFunc) return renderComponentsFunc(element, vm)
//   else return renderComponents['div'](element, vm)
// }
function componentsRender(vm: Vue, element: VueElement) {
  const renderComponentInstance = getComponentInstance(vm, element)
  elements.push(renderComponentInstance)
  renderComponentInstance.render()
}
/**
 * 获取元素实例
 * @param element 
 */
function getComponentInstance(vm: Vue, element: VueElement) {
  if (typeof element.type === 'string') {
    const renderComponentsFunc = renderComponents[element.type]
    if (renderComponentsFunc) return new renderComponentsFunc(element, vm)
    else return new renderComponents['div'](element, vm)
  } else if (typeof element.type === 'object') { // 如果类型是对象

  }
}
