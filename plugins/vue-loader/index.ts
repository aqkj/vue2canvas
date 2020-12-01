/**
 * 解析vue组件加载器
 */
import webpack from 'webpack'
import { stringifyRequest, getRemainingRequest } from 'loader-utils'
import { parseComponent, SFCDescriptor, compile } from 'vue-template-compiler'
import qs from 'querystring'
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
    }
    if (descriptor.script) {
        imports.push(`import _script from '${resource}.${descriptor.script.lang || 'js'}!=!${require.resolve(`${module.filename}`)}!${resource}?type=script';export const script = _script;`)
    }
    if (descriptor.template) {
        imports.push(`import _template from '${resource}?type=template';export const template = _template;`)
    }
    let code: string = `${imports.join('\n')}export const component = { file: '${this.resourcePath}' }`
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
        // console.log(data)
        this.callback(null, `export default render; function _m(index) {const staticRenderFns = ${JSON.stringify(staticRenderFns).replace(/with\(this\)/, '')}; return staticRenderFns[index];} function render(h){ const _c = h; const _v = (str) => str; const str = (function(){${render.replace(/with\(this\)/, '')}})(); return str}`, (descriptor.template as any).map)
        return
    }
    return
}