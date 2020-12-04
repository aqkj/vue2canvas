// vue
import { initCanvas } from "./lifeycle/canvas"
import { initEvent } from "./lifeycle/event"
import { initRender } from "./lifeycle/render"
import { createElement, VueElement } from "./render/element"
import { firstRender, render } from './render/render'
let vmCount = 0
/**
 * Vue类配置信息
 */
interface IOptions {
  /** canvas元素 */
  el?: Element | Node | null | string
  data?: Record<string, any>
  /** 是否为组件 */
  isComp?: boolean
  /** 渲染方法 */
  render?: (h?: any) => void
}
export default class Vue {
  _self: Vue
  _v: any
  uid: number
  $render: any
  $element?: VueElement
  $createElement: any
  $ctx?: CanvasRenderingContext2D
  $root?: Vue
  $parent?: Vue
  name?: string
  constructor(public $options: IOptions) {
    if (!this.$options.el && !this.$options.isComp) console.error('[vue] el是必须的')
    this._self = this
    this.uid = vmCount++
    initEvent(this)
    initRender(this)
  }
  /**
   * 渲染
   */
  $mount() {
    // 设置root
    this.$root = this.$parent ? this.$parent.$root : this
    initCanvas(this)
    /**
     * 渲染循环
     */
    const renderLoop = () => {
      this.$element = this.$render(createElement)
      this.$element && (this.$element.vm = this)
      if (this.$ctx) {
        // 清理渲染
        this.$ctx.clearRect(0, 0, 1000, 1000)
      }
      // 第一次渲染
      firstRender(this, this.$element as VueElement)
      // 渲染循环
      window.requestAnimationFrame(renderLoop)
    }
    window.requestAnimationFrame(renderLoop)
  }
  /**
   * 继承
   */
  extend(options: IOptions) {
    return VueComp.bind(options)
  }
  /**
   * 注册组件
   * @param id 组件名
   * @param options 组件配置
   */
  component(id: string, options: IOptions) {

  }
}
/**
 * vue组件声明
 */
class VueComp extends Vue {
  constructor(options: IOptions, parent: Vue) {
    // 设置为组件
    options.isComp = true
    super(options)
    // 设置父实例
    this.$parent = parent
    // 挂载
    this.$mount()
  }
}