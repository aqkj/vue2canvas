// 元素操作

import Vue from ".."
import { hot } from "../../plugins/vue-loader/hot"
import config from "../common/config"
import { forEach, parseUnit } from "../common/utils"
import { renderComponentNames } from "./render"
import { getStyles } from './style'
// 可继承的样式
export const inheritStyles: string[] = ['fontSize', 'color', 'fontFamily']
/**
 * 元素接口
 */
interface IOptions {
  // 类型
  type: string
  // 子元素数组
  children?: any
  attrs: any
  vm: Vue
}
/** 属性接口 */
interface IAttrs {
  /** 宽度 */
  width: any
  /** 高度 */
  height: any
  /** 背景颜色 */
  backgroundColor: string
  /** 展示方案 */
  display: 'block' | 'inline' | 'inline-block' | 'none' | 'flex'
  /** 溢出处理 */
  overflow: 'auto' | 'visible' | 'hidden' | 'scroll'
  // 内容字符串
  content: string
  /** 背景图片 */
  backgroundImage: string
  style: CSSStyleDeclaration
  staticStyle: CSSStyleDeclaration
  /** 静态class */
  staticClass: string
  /** class名 */
  class: string
  /** 属性列表 */
  attrs: Record<string, any>
}
export interface IPosition {
  x: number
  y: number
}
export interface ISize {
  width: number
  height: number
}
/**
 * Vue元素
 */
export class RealElement {
  /** 配置项 */
  $options: IOptions
  /** vue实例 */
  vm?: Vue
  /** 构造函数 */
  Ctor?: any
  /** 类型 */
  type: string
  // 属性对象
  attrs: IAttrs
  // 属性样式
  styles: CSSStyleDeclaration
  // 真实clas
  classes: string[] = []
  /** 子元素 */
  children: any[] = []
  /** 父元素 */
  parent?: RealElement
  /** 兄弟元素 */
  sibling?: RealElement[]
  /** 上一个兄弟 */
  prevSibling?: RealElement
  /** 下一个兄弟 */
  nextSibling?: RealElement
  /**
   * 元素坐标
   */
  position: IPosition = {
    x: 0,
    y: 0
  }
  value: string = ''
  width: number
  height: number
  contents: string[] = []
  // 获取id
  get id(): string {
    return this.attrs && this.attrs.attrs && this.attrs.attrs.id
  }
  /**
   * 内容高度
   */
  get contentHeight(): number {
    const { fontSize = 24 } = this.styles as any
    return fontSize
  }
  /**
   * 内容宽度
   */
  get contentWidth(): number {
    let { fontSize = 24 } = this.styles as any
    if (!this.value) return 0
    const ctx = this.vm.$ctx
    ctx.font = `${fontSize}px 微软雅黑`
    const size = ctx.measureText(this.value)
    return size.width
  }
  /**
   * 内容盒子大小
   */
  get contentBoxSize(): ISize {
    let { display } = this.styles as any
    let width = this.width
    let height = this.height
    // console.log(height)
    const sizeWidth = this.contentWidth
    if (!width) {
      if (display === 'inline' || display === 'inline-block') {
      //   // const size = this.getContentSize()
      //   if (!this.children.length) {
      //     // console.log(size, this.childSize.width)
      //     width = sizeWidth
      //   } else {
        width = this.childSize.width
      }
      //   // console.log(size)
      // } else {
      //   width = config.pageWidth
      // }
    }
    if (!height) {
      // if (!this.children.length) {
      //   const sizeheight = this.contentHeight
      //   height = sizeheight
      // }
      // else 
      height = this.childSize.height
    }
    return {
      width,
      height
    }
  }
  /** 盒子大小 */
  get boxSize(): ISize {
    const { width, height } = this.contentBoxSize
    return {
      width,
      height
    }
  }
  /**
   * 真实盒子大小
   * 用于识别带overflow的真实大小
   */
  get realBoxSize(): ISize & { hasOverflow: boolean } {
    const boxSize = this.boxSize
    const parent = this.parent
    // 获取父级盒子的真实大小
    const parentBoxSize = parent && parent.realBoxSize || boxSize
    // 判断父级或者更深的父级是否存在overflow
    let hasParentOverflow = (parentBoxSize as any).hasOverflow || parent && parent.styles && parent.styles.overflow && parent.styles.overflow !== 'visible'
    // 真实的盒子大小
    let realSize: ISize = {
      width: hasParentOverflow && parentBoxSize.width > boxSize.width ? boxSize.width : !hasParentOverflow ? boxSize.width : parentBoxSize.width,
      height: hasParentOverflow && parentBoxSize.height > boxSize.height ? boxSize.height : !hasParentOverflow ? boxSize.height : parentBoxSize.height
    }
    return {
      ...realSize,
      hasOverflow: hasParentOverflow
    }
  }
  /** 子盒子大小 */
  get childSize(): ISize {
    let width = 0
    let height = 0
    this.children.forEach((item: RealElement) => {
      width += item.boxSize.width || 0
      height += item.boxSize.height || 0
    })
    return {
      width,
      height
    }
  }
  /**
   * 获取当前坐标
   */
  get curPosition(): IPosition {
    // 当前元素
    const element = this
    // 父级
    const parent = element.parent
    // 基础坐标
    const position: IPosition = parent ? {...parent.curPosition} : {x: 0, y: 0}
    let prevSibling = element.prevSibling
    while(prevSibling) {
      // position.x += prevSibling.boxSize.height || 0
      position.y += prevSibling.boxSize.height || 0
      prevSibling = prevSibling.prevSibling
    }
    return position
  }
  /**
   * 继承的样式
   */
  get extendStyles(): CSSStyleDeclaration {
    // 判断下父
    if (this.parent) {
      let el = this.parent
      const _extendStyles: Record<string, any> = {}
      while (el) {
        // const styles = el.styles
        inheritStyles.forEach(styleName => {
          if (!_extendStyles[styleName]) _extendStyles[styleName] = (el.styles as Record<string, any>)[styleName]
        })
        // console.log(el.styles)
        el = el.parent as RealElement
      }
      return _extendStyles as CSSStyleDeclaration
    } else {
      return {} as CSSStyleDeclaration
    }
  }
  /**
   * 构造函数
   * @param options 配置
   */
  constructor(options: IOptions) {
    this.vm = options.vm
    this.$options = options
    this.type = options.type
    this.attrs = options.attrs || {}
    this.styles = {} as any
    mergeClass(this)
    linkParent(this, options.children || [])
    makeRender(this)
    getStyles(this)
    const styles = Object.assign({}, this.styles, this.attrs.staticStyle, this.attrs.style)
    this.styles = {} as any
    Object.keys(styles).forEach(key => {
      const name = key.replace(/(\-\w)/g, a => a.slice(1).toUpperCase())
      ;(this.styles as any)[name] = (styles as any)[key]
    })
    handlerStyles(this)
  }
  /**
   * 查找className
   */
  hasClass(className: string): boolean {
    return this.classes.indexOf(className) !== -1
  }
}
/**
 * 处理样式
 * @param el 元素
 */
function handlerStyles(el: RealElement) {
  initContent(el)
  let { width, height, display } = el.styles as any
  width = parseUnit(width)
  height = parseUnit(height)
  if (width) el.width = width
  else {
    // debugger
    if (display !== 'inline-block' || display !== 'inline') el.width = config.pageWidth
  }
  if (height) el.height = height
  // el.contentSize.width = width
  // el.contentSize.height = height
}
/**
 * 获取内容宽高
 */
function initContent(el): string[] {
  let { fontSize = 24 } = el.styles as any
  if (!el.value) return []
  // fontSize = (parseUnit(fontSize) || 24)
  const parentBoxSize = el.parent && el.parent.boxSize || { width: config.pageWidth }
  const ctx = el.vm.$ctx
  ctx.font = `${fontSize}px 微软雅黑`
  let content = el.value
  let lineContent = []
  let tempContent = ''
  let width = 0
  let tempWidth = 0
  while (content) {
    // debugger
    let _width = tempWidth
    const contentChar = content.substr(0, 1)
    // 获取大小
    const size = ctx.measureText(contentChar)
    // 增加
    _width += size.width
    if (_width <= parentBoxSize.width) {
      tempWidth = _width
      tempContent += contentChar
      if (content.length === 1) {
        lineContent.push(tempContent)
        width = width > _width ? width : _width
      }
    } else {
      lineContent.push(tempContent)
      tempContent = contentChar
      width = tempWidth
      tempWidth = size.width
    }
    // 赋值内容
    content = content.slice(1)
  }
  el.contents = lineContent
  el.width = width
  el.height = lineContent.length * fontSize
  // const size: TextMetrics = ctx.measureText(this.value)
  // console.log(size.width)
  // return lineContent
}
/**
 * 处理class
 * @param el vue元素
 */
function mergeClass(el: RealElement) {
  const attrs: IAttrs = el.attrs
  const classes: string[] = Object.keys(attrs.class || {}).filter(className => (attrs.class as any)[className])
  const staticClasses: string[] = attrs.staticClass && attrs.staticClass.split(' ') || []
  el.classes = classes.concat(staticClasses)
}
/**
 * 父子联系
 * @param parent 父
 * @param children 子
 */
function linkParent(parent: RealElement, children: any) {
  children = [].concat(children)
  // 文本
  if (parent.type === 'text') {
    parent.value = children.toString()
    parent.children = []
  } else {
    // 父子关系关联
    parent.children = children.map((item: any, index: number) => {
      // 字符串
      if (!(item instanceof RealElement)) {
        item = createElement.call(parent.vm as Vue, 'text', item)
      }
      item.parent = parent
      const sibling = children.slice()
      sibling.splice(index, 1)
      // 上一个兄弟元素
      item.prevSibling = children[index - 1]
      // 下一个兄弟元素
      item.nextSibling = children[index - 1]
      item.sibling = sibling
      return item
    })
  }
}
/**
 * 创建渲染方法
 * @param vm 
 */
function makeRender(vm: RealElement) {

}
// /**
//  * 创建元素方法
//  * @param type 元素类型
//  * @param children 属性列表
//  */
// export function createElement(this: Vue, type: string, children: any): any
/**
 * 创建元素方法
 */
export function createElement(this: Vue, type: string, attrs: any, children?: any): any {
  if (!Array.isArray(attrs) && typeof attrs === 'object') {
  } else {
    children = attrs
    attrs = {}
  }
  if (typeof type === 'object') {
    const comp = type as any
    // 组件构造函数
    const CompCtor = this.extend(comp)
    // // 设置名称
    // this.type = comp.name || `vue-component-name`
    // // 设置构造器
    // this.Ctor = CompCtor
    const vmComp = new CompCtor()
    return vmComp.$element
  } else {
    // 判断是否不为原生组件
    if (!renderComponentNames.includes(type)) {
      // console.log(type)
      const CompCtor = this.$components[type]
      if (CompCtor) {
        const vmComp = new CompCtor()
        return vmComp.$element
      }
    }
    return new RealElement({
      type,
      attrs,
      children,
      vm: this
    })
  }
}
/**
 * 创建文本元素
 * @param text 文本
 */
export function createTextElement(this: Vue, text: any) {
  return createElement.call(this, 'text', text)
}
