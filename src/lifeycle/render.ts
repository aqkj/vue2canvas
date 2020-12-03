// 初始化渲染
import Vue from "..";
import { createElement, createTextElement } from "../render/element";
/**
 * 初始化render
 * @param vm vue对象
 */
export function initRender(vm: Vue) {
  vm.$render = vm.$options.render || function() {}
  vm.$createElement = createElement
  vm._v = createTextElement
}