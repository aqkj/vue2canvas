// vue
import { initCanvas } from "./lifeycle/canvas"
import { initComponents } from "./lifeycle/component"
import { initEvent } from "./lifeycle/event"
import { initRender } from "./lifeycle/render"
import { createElement, RealElement } from "./render/element"
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
  /** 组件 */
  components?: Record<string, IOptions> | IOptions[]
  /** 渲染方法 */
  render?: (h?: any) => void
}
export default class Vue {
  _self: Vue
  _v: any
  uid: number
  $render: any
  $element?: RealElement
  $createElement: any
  $ctx?: CanvasRenderingContext2D
  $root?: Vue
  $parent?: Vue
  $children: Vue[] = []
  $components: Record<string, any> = {}
  name?: string
  constructor(public $options: IOptions) {
    if (!this.$options.el && !this.$options.isComp) console.error('[vue] el是必须的')
    this._self = this
    this.uid = vmCount++
    initEvent(this)
    initRender(this)
    initComponents(this)
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
      this.$children = []
      this.$element = this.$render(createElement.bind(this))
      this.$element && (this.$element.vm = this)
      if (this.$ctx) {
        // 清理渲染
        this.$ctx.clearRect(0, 0, 1000, 1000)
      }
      // 第一次渲染
      firstRender(this, this.$element as RealElement)
      // 渲染循环
      if (!this.$options.isComp) window.requestAnimationFrame(renderLoop)
    }
    // 非组件才会调
    if (!this.$options.isComp) window.requestAnimationFrame(renderLoop)
    else renderLoop()
  }
  /**
   * 继承
   */
  extend(options: IOptions) {
    return VueComp.bind(null, options, this)
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
    // 关联
    parent.$children.push(this)
    // 挂载
    this.$mount()
  }
}