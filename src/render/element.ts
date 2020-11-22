// 元素操作

import Vue from ".."

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
  /** 盒子大小 */
  get boxSize(): ISize {
    let { width, height, display } = this.attrs
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
    linkParent(this, options.children)
    makeRender(this)
  }
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
export function createElement(type: string, attrs: any, children?: any) {
  if (!Array.isArray(attrs) && typeof attrs === 'object') {
  } else {
    children = attrs
    attrs = {}
  }
  return new VueElement({
    type,
    attrs,
    children
  })
}
