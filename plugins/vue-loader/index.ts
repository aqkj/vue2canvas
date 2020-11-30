/**
 * 解析vue组件加载器
 */
import webpack from 'webpack'
/**
 * 导出vueloader
 */
module.exports = function VueLoader(this: webpack.loader.LoaderContext, content: string, map: any) {
    this.cacheable && this.cacheable()
    const cb = this.async()
    const options: Record<string, any> = {}
    let matchData: RegExpMatchArray = []
    while ((matchData = content.match(/<(\/*)(.+?)(\/*)\>/) as RegExpMatchArray)) {
        const tabName = matchData[0]
        options.tabName = []
        
    }
    cb && cb(null, content, map)
}