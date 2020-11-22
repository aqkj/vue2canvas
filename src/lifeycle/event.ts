// 事件处理
import Vue from "..";
import { elements } from "../render/render";
// canvas需要监听的事件
let canvasEvents = ['touchstart', 'touchmove', 'touchend', 'click']
/**
 * 初始化事件
 * @param vm vue对象
 */
export function initEvent(vm: Vue) {
  initCanvasEvent(vm)
}
/**
 * 初始化canvas事件
 * @param vm vue对象
 */
function initCanvasEvent(vm: Vue) {
  // 获取canvas元素
  const canvas: HTMLCanvasElement = vm.$options.el as HTMLCanvasElement
  canvasEvents.forEach(event => {
    canvas.addEventListener(event, () => {
      elements.forEach((ele: any) => {
        // ele.$emit(event)
      })
    })
  })
}