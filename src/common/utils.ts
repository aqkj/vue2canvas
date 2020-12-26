// 工具方法

import config from "./config"

// export function is
export enum EUnit {
  REM = 'rem',
  PX = 'px',
  EM = 'em',
  VH = 'vh'
}
/**
 * 计量单位转换
 * @param str 单位数量
 */
export function parseUnit(str: string) {
  str = str && String(str) || '0'
  // 计量单位
  const unit: string = (str.match(/\d*(\w+)$/) || [])[1]
  const number: number = parseFloat(str)
  // 判断是否为px单位
  if (unit === EUnit.PX) {
    return number
  } else if (unit === EUnit.VH) { // 判断是否是vh
    return config.pageHeight * (number / 100)
  } else return number
}
// 数组原型
const arrayProto = Array.prototype
/**
 * 遍历
 * @param list 列表
 * @param callback 回调
 */
export function forEach(list: any, callback: any) {
  arrayProto.forEach.call(list, callback)
}
/**
 * 转换为字符串
 * @param val 
 */
export function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
/**
 * 判断是否是object类型
 * @param obj 
 */
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}
/**
 * 转换为字符串
 */
export const _toString = Object.prototype.toString;
/**
 * 转换坐标
 * @param str 坐标字符串
 */
export function parsePosition(str: string): string[] {
  const positions = str.split(' ')
  return positions.map(pos => {
    if (pos === 'center') return '50%'
    else if (pos === 'bottom' || pos === 'right') return '100%'
    else return '0%'
  })
}
/**
 * 转换百分比
 * @param percentage 百分比
 * @param base 基数
 */
export function parsePercentage(percentage: string | number, base: string | number) {
  percentage = parseFloat(percentage as string)
  base = parseFloat(base as string)
  return base * (percentage / 100)
}