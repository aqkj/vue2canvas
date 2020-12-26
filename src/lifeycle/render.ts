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
  if (!vm.$options.isComp) vm.$element.initStyles()
  vm.$element && (vm.$element.vm = vm)
  // vm._v = createTextElement.bind(vm)
}
const imgCache: Record<string, any> = {}
/**
 * 加载图片资源
 * @param url 资源
 */
export function loadImage(url: string, callback?: CallableFunction): HTMLImageElement | undefined {
  if (!url) return undefined
  const imageData = imgCache[url]
  if (!imageData) {
    const img = document.createElement('img')
    img.onload = () => {
      callback && callback()
    }
    img.src = url
    imgCache[url] = img
    return imgCache[url]
  }
  return imageData
}