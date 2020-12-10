// 事件处理
import Vue from "..";
import config from "../common/config";
import { initCanvas } from "./canvas";
/**
 * 初始化事件
 * @param vm vue对象
 */
export function initEvent(vm: Vue) {
  initCanvas(vm)
}
/**
 * 初始化配置
 * @param vm vue对象
 */
export function initConfig(vm: Vue) {
  window.addEventListener('resize', (e) => {
    config.pageWidth = document.documentElement.clientWidth * 2
    config.pageWidth = document.documentElement.clientHeight * 2
  })
}