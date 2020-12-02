// div组件
import Vue from "../..";
import { EventTrigger } from "../../common/event";
import { VueElement } from "../element";
import { render } from "../render";
const imgCache: Record<string, HTMLImageElement> = {}
/**
 * 渲染div组件
 */
export default class DIV extends EventTrigger {
  ctx: CanvasRenderingContext2D
  styles: CSSStyleDeclaration
  constructor(public element: VueElement, public vm: Vue) {
    super()
    this.ctx = this.vm.$ctx
    const attrs = this.element.attrs
    this.styles = Object.assign({}, attrs.staticStyle, attrs.style) as CSSStyleDeclaration
  }
  render() {
    this.ctx.save()
    this.createBox()
    this.drawColor()
    this.drawImage()
    this.parseOverflow()
    this.initEvent()
    // 渲染子元素
    this.renderChild()
    this.ctx.restore()
  }
  initEvent() {
    const boxSize = this.element.realBoxSize || {}
    const curPosition = this.element.curPosition
    this.$on('touchmove', (e: TouchEvent, index: number) => {
      const touch = (e.touches[0] || {})
      const position = {
        x: touch.clientX * 2,
        y: touch.clientY * 2
      }
      // console.log(this.element)
      // 判断是否在点击区域内
      if (position.x >= curPosition.x
        && position.x <= curPosition.x + boxSize.width
        && position.y >= curPosition.y
        && position.y <= curPosition.y + boxSize.height) {
        console.log(this.styles, index)
        return true
      }
      // console.log(position.x, position.y, curPosition.x, curPosition.y)
    })
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
  /**
   * 颜色处理
   */
  drawColor() {
    const backgroundColor = this.styles.backgroundColor || ''
    // 判断背景颜色是否存在
    if (backgroundColor) {
      const boxSize = this.element.boxSize || {}
      const position = this.element.curPosition
      this.ctx.beginPath();
      this.ctx.rect(position.x, position.y, boxSize.width, boxSize.height)
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fill()
    }
  }
  /**
   * 绘制图片
   */
  drawImage() {
    const backgroundImage = this.styles.backgroundImage || ''
    // 判断背景图是否存在
    if (backgroundImage) {
      const boxSize = this.element.boxSize || {}
      const position = this.element.curPosition
      if (!imgCache[backgroundImage]) {
        const img = document.createElement('img')
        img.onload = () => {
          this.ctx.drawImage(img, position.x, position.y, boxSize.width, boxSize.height)
        }
        img.src = backgroundImage
        imgCache[backgroundImage] = img
      } else {
        this.ctx.drawImage(imgCache[backgroundImage], position.x, position.y, boxSize.width, boxSize.height)
      }
    }
  }
  /**
   * 溢出处理
   */
  parseOverflow() {
    const overflow = this.styles.overflow || 'visible'
    // 判断溢出模式
    if (overflow !== 'visible') {
      const boxSize = this.element.boxSize
      const position = this.element.curPosition
      this.ctx.beginPath();
      this.ctx.rect(position.x, position.y, boxSize.width, boxSize.height);
      this.ctx.clip()
      // 判断如果overflow为滚动或者自动
      if (overflow === 'scroll' || overflow === 'auto') {

      }
    }
    // this.ctx.save()
  }
  /**
   * 渲染子元素
   */
  renderChild() {
    const element = this.element
    // 判断是否存在子元素，遍历渲染
    if (element.children && element.children.length) {
      element.children.forEach(item => {
        render(this.vm, item)
      })
    }
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