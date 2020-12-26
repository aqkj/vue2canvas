// vue
import { initCanvas } from "./lifeycle/canvas"
import { initComponents } from "./lifeycle/component"
import { initData } from "./lifeycle/data"
import { initEvent } from "./lifeycle/event"
import { initRender } from "./lifeycle/render"
import { createElement, RealElement } from "./render/element"
import { firstRender, render } from './render/render'
let vmCount = 0
/**
 * Vue类配置信息
 */
interface IRenderFunc {
  (h?: any): void
}
interface IOptions {
  /** canvas元素 */
  el?: Element | Node | null | string
  data?: Record<string, any>
  /** 是否为组件 */
  isComp?: boolean
  /** 组件 */
  components?: Record<string, IOptions> | IOptions[]
  /** 静态渲染方法数组 */
  staticRenderFns?: IRenderFunc[]
  /** 渲染方法 */
  render?: IRenderFunc
}
export default class Vue {
  _self: Vue
  _v: any
  _m: any
  uid: number
  $render: any
  $element?: RealElement
  $createElement: any
  $ctx?: CanvasRenderingContext2D
  $root?: Vue
  $parent?: Vue
  $children: Vue[] = []
  $components: Record<string, any> = {}
  $data?: Record<string, any> = {}
  name?: string
  constructor(public $options: IOptions, parent?: Vue) {
    if (!this.$options.el && !this.$options.isComp) console.error('[vue] el是必须的')
    this._self = this
    this.uid = vmCount++
    this.$parent = parent
    // 设置root
    this.$root = parent ? parent.$root ? parent.$root : parent : this
    initEvent(this)
    initComponents(this)
    initData(this)
    initCanvas(this)
    initRender(this)
  }
  /**
   * 渲染
   */
  $mount() {
    // debugger
    /**
     * 渲染循环
     */
    // debugger
    const renderLoop = () => {
      if (this.$ctx) {
        // 清理渲染
        this.$ctx.clearRect(0, 0, 1000, 1000)
      }
      // 第一次渲染
      firstRender(this, this.$element as RealElement)
      // 渲染循环
      // if (!this.$options.isComp) window.requestAnimationFrame(renderLoop)
      window.requestAnimationFrame(renderLoop)
    }
    // 非组件才会调
    // if (!this.$options.isComp) window.requestAnimationFrame(renderLoop)
    // renderLoop()
    window.requestAnimationFrame(renderLoop)
  }
  /**
   * 强制更新
   */
  $foceUpdate() {
    firstRender(this.$root, this.$root.$element as RealElement)
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
    super(options, parent)
    // 设置父实例
    // this.$parent = parent
    // 关联
    parent.$children.push(this)
    // 挂载
    // this.$mount()
  }
  /**
   * 子组件不需要render
   */
  $mount() {

  }
}