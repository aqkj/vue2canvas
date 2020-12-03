// 工具方法

// export function is
export enum EUnit {
  REM = 'rem',
  PX = 'px',
  EM = 'em'
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
  } else return number
}