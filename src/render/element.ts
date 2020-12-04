// 元素操作

import Vue from ".."
import { forEach, parseUnit } from "../common/utils"
import { getStyles } from './style'

/**
 * 元素接口
 */
interface IOptions {
  // 类型
  type: string
  // 子元素数组
  children?: any
  attrs: any
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
interface IPosition {
  x: number
  y: number
}
interface ISize {
  width: number
  height: number
}
/**
 * Vue元素
 */
export class VueElement {
  /** vue实例 */
  vm?: Vue
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
  parent?: VueElement
  /** 兄弟元素 */
  sibling?: VueElement[]
  /** 上一个兄弟 */
  prevSibling?: VueElement
  /** 下一个兄弟 */
  nextSibling?: VueElement
  /**
   * 元素坐标
   */
  position: IPosition = {
    x: 0,
    y: 0
  }
  value: string = ''
  // 获取id
  get id(): string {
    return this.attrs && this.attrs.attrs && this.attrs.attrs.id
  }
  /** 盒子大小 */
  get boxSize(): ISize {
    let { width, height, display } = this.styles as any
    width = parseUnit(width)
    height = parseUnit(height)
    // console.log(height)
    if (!width) {
      if (display === 'inline' || display === 'inline-block') {
        width = this.childSize.width
      } else {
        width = 750
      }
    }
    if (!height) height = this.childSize.height
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
    this.children.forEach((item: VueElement) => {
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
  constructor(options: IOptions) {
    this.type = options.type
    this.attrs = options.attrs || {}
    this.styles = {} as any
    mergeClass(this)
    linkParent(this, options.children)
    makeRender(this)
    getStyles(this)
    const styles = Object.assign({}, this.styles, this.attrs.staticStyle, this.attrs.style)
    this.styles = {} as any
    Object.keys(styles).forEach(key => {
      const name = key.replace(/(\-\w)/g, a => a.slice(1).toUpperCase())
      ;(this.styles as any)[name] = (styles as any)[key]
    })
  }
  /**
   * 查找className
   */
  hasClass(className: string): boolean {
    return this.classes.indexOf(className) !== -1
  }
}
/**
 * 处理class
 * @param el vue元素
 */
function mergeClass(el: VueElement) {
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
function linkParent(parent: VueElement, children: any) {
  children = [].concat(children)
  // 文本
  if (parent.type === 'text') {
    parent.value = children.toString()
    parent.children = []
  } else {
    // 父子关系关联
    parent.children = children.map((item: any, index: number) => {
      // 字符串
      if (!(item instanceof VueElement)) {
        item = createElement('text', item)
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
function makeRender(vm: VueElement) {

}
/**
 * 创建元素方法
 * @param type 元素类型
 * @param children 属性列表
 */
export function createElement(type: string, children: any): any
/**
 * 创建元素方法
 */
export function createElement(type: string | Vue, attrs: any, children?: any) {
  if (!Array.isArray(attrs) && typeof attrs === 'object') {
  } else {
    children = attrs
    attrs = {}
  }
  let Ctor = null
  if (type instanceof Vue) {
    const vmComp = type
    type = vmComp.name || `vue-component-name`
  }
  return new VueElement({
    type,
    attrs,
    children
  })
}
/**
 * 创建文本元素
 * @param text 文本
 */
export function createTextElement(text: any) {
  return createElement('text', text)
}
