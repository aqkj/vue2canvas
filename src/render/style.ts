// 样式处理

import { forEach } from "../common/utils";
import { RealElement } from "./element";


export const domClass: Record<string, any> = Object.create({})
/**
 * 获取样式
 * @param el vue元素对象
 */
export function getStyles(el: RealElement) {
  const styles = document.styleSheets;
  forEach(styles, (style: any, index: number) => {
    let rules: any[] = []
    try {
      rules = style.cssRules || style.rules;
    } catch (err) {
      rules = [];
    }
    forEach(rules, (rule: CSSStyleRule) => {
      const { cssText } = rule
      const index = cssText.indexOf('{')
      const names = parseClassName(cssText.slice(0, index).trim())
      const style = parseStyle(cssText.slice(index))
      names.forEach(name => {
        domClass[name] = Object.assign({}, domClass[name], style)
      })
    })
  })
  // const class: string = Object.assign({}, vm.attrs.staticClass, vm.attrs.class)
  for (const cssSelector in domClass) {
    // 获取样式
    // const styles = domClass[className]
    // vm.attrs.staticClass
    // el.type
    // if (el.type === 'img') {
    //   debugger
    // }
    const selectorArr: string[] = cssSelector.split(' ').reverse()
    // 获取最后一个选择器
    // const lastSelector: string = selectorArr[selectorArr.length - 1]
    // // 是否是类选择器
    // const isClassSelector: boolean = !!lastSelector.match(/\./)
    // if (lastSelector) {
    //   if (isClassSelector) {
    //     const isHasClass = el.hasClass(lastSelector)
    //   }
    // }
    let element: RealElement | undefined = el
    const canMerge: boolean = selectorArr.every((selector: string, index: number) => {
      // 判断是否是类选择器
      const isClassSelector: boolean = !!selector.match(/\./)
      // 是否是id选择器
      const isIdSelector: boolean = !!selector.match(/\#/)
      if (selector) {
        // 真实的选择器
        const realSelector: string = selector.slice(1)
        while (element) {
          // debugger
          let result = false
          if (isClassSelector) {
            // 判断是否存在这个class
            result = element.hasClass(realSelector)
          } else if (isIdSelector) { // 判断是否是id选择器
            // 判断当前id是否相同
            result = element.id === realSelector
          } else { // 则为类型选择器
            result = element.type === selector
          }
          element = element.parent
          if (result) return true
          else if (index === 0) return false
        }
        return false
      }
    })
    if (canMerge) {
      el.styles = Object.assign({}, el.styles, domClass[cssSelector])
    }
  }
}
/**
 * 转换样式
 * @param styleStr 样式字符串
 */
function parseStyle(styleStr: string): Record<string, any> {
  // return
  styleStr = styleStr.slice(1, -1).trim().replace(/\;( +)/g, '|')
  const styleArr: string[] = styleStr.split('|')
  const styles: Record<string, any> = {}
  styleArr.forEach(style => {
    style = style.trim()
    const temp = style.split(': ')
    if (temp.length && temp[0]) {
      let value = (temp[1] || '').trim()
      if (value[value.length - 1] === ';') value = value.slice(0, -1)
      styles[temp[0].trim()] = value
    }
  })
  return styles
}
/**
 * 处理className
 */
function parseClassName(className: string): string[] {
  if (!className) return []
  const classNames: string[] = className.split(',').map(name => name.trim())
  return classNames
}
/**
 * 默认样式
 */
export const defaultStyle: Record<string, any> = {
  IMG: {
    display: 'inline-block'
  }
}