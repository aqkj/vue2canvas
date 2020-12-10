// 初始化渲染
import Vue from "..";
import { createElement, createTextElement } from "../render/element";
import { renderStatic } from "../render/render";
import { toString } from '../common/utils'
/**
 * 初始化render
 * @param vm vue对象
 */
export function initRender(vm: Vue) {
  vm.$render = vm.$options.render || function() {}
  vm.$createElement = createElement.bind(vm)
  vm._v = createTextElement.bind(vm)
  vm._m = renderStatic.bind(vm)
  ;(vm as any)._s = toString
  vm.$children = []
  vm.$element = vm.$render(createElement.bind(vm))
  vm.$element && (vm.$element.vm = vm)
  // vm._v = createTextElement.bind(vm)
}