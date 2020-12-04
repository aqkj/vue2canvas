
// 初始化canvas
import Vue from '../vue'
import DIV from "../render/components/div";
import { elements } from "../render/render";
// canvas需要监听的事件
let canvasEvents = ['touchstart', 'touchmove', 'touchend', 'click']
/**
 * 初始化canvas
 * @param vm vue实例
 */
export function initCanvas(vm: Vue) {
  if (!vm.$options.isComp) {
    vm.$ctx = (vm.$options.el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    initCanvasEvent(vm)
  } else {
    vm.$ctx = vm.$root?.$ctx
  }
}
/**
 * 初始化canvas事件
 * @param vm vue对象
 */
function initCanvasEvent(vm: Vue) {
  // 获取canvas元素
  const canvas: HTMLCanvasElement = vm.$options.el as HTMLCanvasElement
  canvasEvents.forEach(event => {
    canvas.addEventListener(event, (e) => {
      // 阻止冒泡
      e.stopPropagation()
      // 阻止默认事件
      e.preventDefault()
      // console.log(e)
      const eventData: Record<string, any> = {}
      // if (e instanceof TouchEvent) {
      //   eventData.touches = Array.from(e.touches).map(touch => ({ x: touch.clientX, y: touch.clientY }))
      // } else if (e instanceof MouseEvent) {
      //   eventData.touches = [{
      //     x: e.clientX,
      //     y: e.clientY
      //   }]
      // }
      // console.log(eventData)
      // console.log(elements)
      const eles = elements.slice().reverse()
      for (let index = 0; index < eles.length; index++) {
        const element = eles[index];
        const result = element.$emit(event, e, index)
        if (result) break;
      }
      // elements.slice().reverse().forEach((ele: DIV, index) => {
      //   const result = ele.$emit(event, e, index)
      // })
    })
  })
}