// 初始化渲染
import Vue from "..";
import { createElement } from "../render/element";
/**
 * 初始化render
 * @param vm vue对象
 */
export function initRender(vm: Vue) {
  vm.$render = vm.$options.render || function() {}
  vm.$element = vm.$render(createElement)
  vm.$element && (vm.$element.vm = vm)
}