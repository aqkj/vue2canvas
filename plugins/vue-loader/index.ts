/**
 * 解析vue组件加载器
 */
import webpack from 'webpack'
import { stringifyRequest, getRemainingRequest } from 'loader-utils'
import { parseComponent, SFCDescriptor } from 'vue-template-compiler'
import qs from 'querystring'
/**
 * 导出vueloader
 */
module.exports = function VueLoader(this: webpack.loader.LoaderContext, content: string, map: any) {
    this.cacheable && this.cacheable()
    const descriptor: SFCDescriptor = parseComponent(content)
    const resource: string = getRemainingRequest(this as any)
    // console.log(descriptor, this.resource, )
    const { type = '' } = qs.parse(this.resourceQuery.slice(1))
    if (type) {
        return converCodeFromType.call(this, {
            type: type as string,
            descriptor
        })
    }
    const imports: string[] = []
    if (descriptor.styles) {
        imports.push(`import _style from '${resource}?type=style';export const style = _style;`)
    }
    if (descriptor.script) {
        imports.push(`import _script from '${resource}?type=script';export const script = _script;`)
    }
    if (descriptor.template) {
        imports.push(`import _template from '${resource}?type=template';export const template = _template;`)
    }
    let code: string = `${imports.join('\n')}export const component = { file: '${this.resourcePath}' }`
    return code
}
/**
 * 转换成各种类型的代码
 * @param type 类型
 */
function converCodeFromType(this: webpack.loader.LoaderContext, {
    type,
    descriptor
}: {
    type: string
    descriptor: SFCDescriptor
}) {
    if (type === 'script') {
        this.callback(null, descriptor.script?.content, (descriptor.script as any).map)
        return
    } else if (type === 'style') {
        this.resourcePath += '.less'
        // console.log(this.)
        const content = descriptor.styles.map(style => style.content).join('\n')
        this.callback(null, `export default \`${content}\``)
        return
    } else if (type === 'template') {
        this.callback(null, `export default \`${descriptor.template?.content}\``, (descriptor.template as any).map)
        return
    }
    return
}