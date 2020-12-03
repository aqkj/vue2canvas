// vue
import { initEvent } from "./lifeycle/event"
import { initRender } from "./lifeycle/render"
import { createElement, VueElement } from "./render/element"
import { firstRender, render } from './render/render'
/**
 * Vue类配置信息
 */
interface IOptions {
  /** canvas元素 */
  el?: Element | Node | null | string
  data?: Record<string, any>
  /** 渲染方法 */
  render?: (h?: any) => void
}
export default class Vue {
  _self: Vue
  _v: any
  $render: any
  $element?: VueElement
  $createElement: any
  $ctx: CanvasRenderingContext2D
  constructor(public $options: IOptions) {
    if (!this.$options.el) console.error('[vue] el是必须的')
    this.$ctx = (this.$options.el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    this._self = this
    initEvent(this)
    initRender(this)
  }
  /**
   * 渲染
   */
  $mount() {
    const render = () => {
      this.$element = this.$render(createElement)
      this.$element && (this.$element.vm = this)
      // 清理渲染
      this.$ctx.clearRect(0, 0, 1000, 1000)
      firstRender(this, this.$element as VueElement)
      window.requestAnimationFrame(render)
    }
    // 逐帧请求渲染
    window.requestAnimationFrame(render)
  }
}