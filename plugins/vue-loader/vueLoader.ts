/**
 * 解析vue组件加载器
 */
import webpack from 'webpack'
module.exports = function VueLoader(this: webpack.loader.LoaderContext, content: string) {
    this.cacheable && this.cacheable()
    const cb = this.async()
    cb && cb(null, content)
}