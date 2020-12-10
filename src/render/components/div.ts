// div组件
import Vue from "../..";
import { EventTrigger } from "../../common/event";
import { parseUnit } from "../../common/utils";
import { RealElement, ISize } from "../element";
import { render } from "../render";
const imgCache: Record<string, HTMLImageElement> = {}
/**
 * 渲染div组件
 */
export default class DIV extends EventTrigger {
  ctx: CanvasRenderingContext2D
  styles: CSSStyleDeclaration
  constructor(public element: RealElement, public vm: Vue) {
    super()
    this.ctx = this.vm.$ctx as CanvasRenderingContext2D
    const attrs = this.element.attrs
    this.styles = {
      ...this.element.extendStyles,
      ...this.element.styles
    }
    debugger
    // console.log(this.styles)
  }
  render() {
    this.ctx.save()
    this.createBox()
    // 颜色
    this.drawColor()
    // 画文字
    this.drawText()
    // 图片
    this.drawImage()
    // 超出
    this.parseOverflow()
    // 初始化事件
    this.initEvent()
    // 渲染子元素
    this.renderChild()
    this.ctx.restore()
  }
  /**
   * 初始化事件
   */
  initEvent() {
    const boxSize = this.element.realBoxSize || {} as ISize
    const curPosition = this.element.curPosition
    this.$on('touchmove', (e: TouchEvent, index: number) => {
      const touch = (e.touches.item(0) || {}) as Touch
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
      // debugger
      const boxSize = this.element.boxSize
      const position = this.element.curPosition
      // console.log(boxSize, position)
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
    let { backgroundImage = '', backgroundSize = '' } = this.styles
    // 判断背景图是否存在
    if (backgroundImage) {
      const boxSize = this.element.boxSize
      const position = this.element.curPosition
      backgroundImage = backgroundImage.match(/url\(\"(.*)\"\)/)[1]
      let imageData = imgCache[backgroundImage]
      if (!imageData) {
        const img = document.createElement('img')
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, img.width, img.height, position.x, position.y, boxSize.width, boxSize.height)
        }
        img.src = backgroundImage
        imgCache[backgroundImage] = img
      } else {
        this.ctx.drawImage(imageData, 0, 0, imageData.width, imageData.height, position.x, position.y, boxSize.width, boxSize.height)
      }
    }
  }
  /**
   * 绘制文字
   */
  drawText() {
    // 判断是否设置content
    if (this.element.value) {
      // debugger
      const boxSize = this.element.boxSize
      // const contentSize = this.element.contentSize
      const position = this.element.curPosition
      const fontSize = parseUnit(this.styles.fontSize as any)
      const color = this.styles.color
      // if (!contentSize.height) {
      //   debugger
      //   contentSize.height += fontSize
      // }
      this.ctx.font = `${fontSize}px 微软雅黑`
      this.ctx.textAlign = 'left'
      this.ctx.fillStyle = color || '#000'
      this.ctx.textBaseline = 'top'
      // console.log(this.element.contents)
      this.element.contents.forEach((content, index) => {
        this.ctx.fillText(content, position.x, position.y + fontSize * index)
      })
      // debugger
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
// export default function DIV(element: RealElement, vm: Vue) {
//   createBox(element, vm)
//   vm.$ctx.stroke()
// }
/**
 * 渲染div
 * @param $el 元素
 * @param vm vue实例
 */
export function renderDIV($el: RealElement, vm: Vue) {
  return new DIV($el, vm).render()
}