// vue
import { createElement, VueElement } from "./render/element"
import { render } from './render/render'
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
  private render: any
  private $element?: VueElement
  $ctx: CanvasRenderingContext2D
  constructor(public $options: IOptions) {
    if (!this.$options.el) console.error('[vue] el是必须的')
    this.$ctx = (this.$options.el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    this.render = this.$options.render || function() {}
  }
  /**
   * 渲染
   */
  $mount() {
    const element: VueElement = this.$element = this.render(createElement)
    // 逐帧请求渲染
    window.requestAnimationFrame(render.bind(null, this, element))
  }
}