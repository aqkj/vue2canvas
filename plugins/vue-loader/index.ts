/**
 * 解析vue组件加载器
 */
import webpack from 'webpack'
import { stringifyRequest, getRemainingRequest } from 'loader-utils'
import { parseComponent, SFCDescriptor, compile, compileToFunctions } from 'vue-template-compiler'
const complier = require('vue-template-es2015-compiler')
import qs from 'querystring'
import { hot } from './hot'
/**
 * 导出vueloader
 */
module.exports = function VueLoader(this: webpack.loader.LoaderContext, content: string, map: any) {
    this.cacheable && this.cacheable()
    const descriptor: SFCDescriptor = parseComponent(content)
    const resource: string = getRemainingRequest(this as any)
    // console.log(descriptor, this.resource, )
    const { type = '', index = 0 } = qs.parse(this.resourceQuery.slice(1))
    if (type) {
        return converCodeFromType.call(this, {
            type: type as string,
            index: index as string,
            descriptor
        })
    }
    const imports: string[] = []
    if (descriptor.styles) {
        imports.push(`const styles = [];`)
        descriptor.styles.forEach((style, index) => {
            imports.push(`import _style${index} from '${resource}.${style.lang || 'css'}!=!${require.resolve(`${module.filename}`)}!${resource}?type=style&index=${index}';try{styles.push(_styles${index});}catch(e){}`)
        })
        imports.push(`export const style = styles`);
    } else imports.push(`const styles = []`)
    if (descriptor.script) {
        imports.push(`import script from '${resource}.${descriptor.script.lang || 'js'}!=!${require.resolve(`${module.filename}`)}!${resource}?type=script';`)
    } else imports.push(`const script = {}`)
    if (descriptor.template) {
        imports.push(`import render from '${resource}?type=template';`)
    } else imports.push(`const render = () => {}`)
    let code: string = hot(`${imports.join('\n')}export default { file: '${this.resourcePath}', ...(script || {}), render, styles }`)
    return code
}
function pitch(this: webpack.loader.LoaderContext, remainingRequest: any, precedingRequest: any, data: any) {
    // console.log(remainingRequest, precedingRequest, data)
    // const query = qs.parse(this.resourceQuery)
    // console.log(query, Object.keys(this._compiler.options), this._compilation.options.module.rules)
    // return `import '${this.resourcePath += '.less'}'`
}
module.exports.pitch = pitch
/**
 * 转换成各种类型的代码
 * @param type 类型
 */
function converCodeFromType(this: webpack.loader.LoaderContext, {
    type,
    index,
    descriptor
}: {
    type: string
    index: number | string
    descriptor: SFCDescriptor
}) {
    if (type === 'script') {
        this.callback(null, descriptor.script?.content, (descriptor.script as any).map)
        return
    } else if (type === 'style') {
        // this.resourcePath += '.less'
        // console.log(this.)
        const content = descriptor.styles.map(style => style.content)[index as any]
        this.callback(null, content)
        return
    } else if (type === 'template' && descriptor.template) {

        const { staticRenderFns, render } = compile(descriptor.template.content)
        this.callback(null, `export default render; ${complier(`function render(_h,_vm) {${render}}`)}`, (descriptor.template as any).map)
        return
    }
    return
}