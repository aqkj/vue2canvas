// div组件
import Vue from "../..";
import { VueElement } from "../element";

/**
 * 渲染div组件
 */
export default class DIV {
  ctx: CanvasRenderingContext2D
  constructor(public element: VueElement, public vm: Vue) {
    this.ctx = this.vm.$ctx
  }
  render() {
    // this.parseOverflow()
    this.createBox()
    this.drawColor()
  }
  /**
   * 创建盒子方法
   * 盒子具有属性宽度，高度,padding,margin,border
   */
  createBox() {
    // const boxSize = this.element.attrs || {}
    // const position = this.getCurPosition()
    // this.ctx.lineWidth = 0
    // this.ctx.rect(position.x, position.y, boxSize.width, boxSize.height)
    // this.ctx.stroke()
  }
  drawColor() {
    const backgroundColor = this.element.attrs.backgroundColor || ''
    if (backgroundColor) {
      const boxSize = this.element.boxSize || {}
      const position = this.element.curPosition
      this.ctx.beginPath();
      this.ctx.rect(position.x, position.y, boxSize.width, boxSize.height)
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fill()
    }
  }
  parseOverflow() {
    const boxSize = this.element.boxSize
    const position = this.element.curPosition
    this.ctx.beginPath();
    this.ctx.rect(position.x, position.y, boxSize.width, boxSize.height);
    this.ctx.clip()
    this.ctx.save()
  }
  /**
   * 获取坐标
   */
  // getCurPosition() {
  //   // 当前元素
  //   const element = this.element 
  //   // 父级
  //   const parent = element.parent
  //   // 基础坐标
  //   const position = parent ? {...parent.position} : {x: 0, y: 0}
  //   let prevSibling = element.prevSibling
  //   while(prevSibling) {
  //     // position.x += prevSibling.boxSize.height || 0
  //     position.y += prevSibling.boxSize.height || 0
  //     prevSibling = prevSibling.prevSibling
  //   }
  //   return position
  // }
}
// export default function DIV(element: VueElement, vm: Vue) {
//   createBox(element, vm)
//   vm.$ctx.stroke()
// }
