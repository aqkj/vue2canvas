"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var loader_utils_1 = require("loader-utils");
var vue_template_compiler_1 = require("vue-template-compiler");
var complier = require('vue-template-es2015-compiler');
var querystring_1 = __importDefault(require("querystring"));
var hot_1 = require("./hot");
/**
 * 导出vueloader
 */
module.exports = function VueLoader(content, map) {
    this.cacheable && this.cacheable();
    var descriptor = vue_template_compiler_1.parseComponent(content);
    var resource = loader_utils_1.getRemainingRequest(this);
    // console.log(descriptor, this.resource, )
    var _a = querystring_1["default"].parse(this.resourceQuery.slice(1)), _b = _a.type, type = _b === void 0 ? '' : _b, _c = _a.index, index = _c === void 0 ? 0 : _c;
    if (type) {
        return converCodeFromType.call(this, {
            type: type,
            index: index,
            descriptor: descriptor
        });
    }
    var imports = [];
    if (descriptor.styles) {
        imports.push("const styles = [];");
        descriptor.styles.forEach(function (style, index) {
            imports.push("import _style" + index + " from '" + resource + "." + (style.lang || 'css') + "!=!" + require.resolve("" + module.filename) + "!" + resource + "?type=style&index=" + index + "';try{styles.push(_styles" + index + ");}catch(e){}");
        });
        imports.push("export const style = styles");
    }
    else
        imports.push("const styles = []");
    if (descriptor.script) {
        imports.push("import script from '" + resource + "." + (descriptor.script.lang || 'js') + "!=!" + require.resolve("" + module.filename) + "!" + resource + "?type=script';");
    }
    else
        imports.push("const script = {}");
    if (descriptor.template) {
        imports.push("import { render, staticRenderFns } from '" + resource + "?type=template';");
    }
    else
        imports.push("const render = () => {};const staticRenderFns = []");
    var code = hot_1.hot(imports.join('\n') + "export default { file: '" + this.resourcePath + "', ...(script || {}), render, staticRenderFns, styles }");
    return code;
};
function pitch(remainingRequest, precedingRequest, data) {
    // console.log(remainingRequest, precedingRequest, data)
    // const query = qs.parse(this.resourceQuery)
    // console.log(query, Object.keys(this._compiler.options), this._compilation.options.module.rules)
    // return `import '${this.resourcePath += '.less'}'`
}
module.exports.pitch = pitch;
/**
 * 转换成各种类型的代码
 * @param type 类型
 */
function converCodeFromType(_a) {
    var _b;
    var type = _a.type, index = _a.index, descriptor = _a.descriptor;
    if (type === 'script') {
        this.callback(null, (_b = descriptor.script) === null || _b === void 0 ? void 0 : _b.content, descriptor.script.map);
        return;
    }
    else if (type === 'style') {
        // this.resourcePath += '.less'
        // console.log(this.)
        var content = descriptor.styles.map(function (style) { return style.content; })[index];
        this.callback(null, content);
        return;
    }
    else if (type === 'template' && descriptor.template) {
        var _c = vue_template_compiler_1.compile(descriptor.template.content), staticRenderFns = _c.staticRenderFns, render = _c.render;
        this.callback(null, "export { render, staticRenderFns }; " + complier("function render(_h,_vm) {" + render + "}\nvar staticRenderFns = [" + staticRenderFns.map(function (code) { return "function (_h,_vm) {" + code + "}"; }) + "]"), descriptor.template.map);
        return;
    }
    return;
}
