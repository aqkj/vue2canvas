"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var loader_utils_1 = require("loader-utils");
var vue_template_compiler_1 = require("vue-template-compiler");
var querystring_1 = __importDefault(require("querystring"));
/**
 * 导出vueloader
 */
module.exports = function VueLoader(content, map) {
    this.cacheable && this.cacheable();
    var descriptor = vue_template_compiler_1.parseComponent(content);
    var resource = loader_utils_1.getRemainingRequest(this);
    // console.log(descriptor, this.resource, )
    var _a = querystring_1["default"].parse(this.resourceQuery.slice(1)).type, type = _a === void 0 ? '' : _a;
    if (type) {
        return converCodeFromType.call(this, {
            type: type,
            descriptor: descriptor
        });
    }
    var imports = [];
    if (descriptor.styles) {
        imports.push("import _style from '" + resource + "?type=style';export const style = _style;");
    }
    if (descriptor.script) {
        imports.push("import _script from '" + resource + "?type=script';export const script = _script;");
    }
    if (descriptor.template) {
        imports.push("import _template from '" + resource + "?type=template';export const template = _template;");
    }
    var code = imports.join('\n') + "export const component = { file: '" + this.resourcePath + "' }";
    return code;
};
/**
 * 转换成各种类型的代码
 * @param type 类型
 */
function converCodeFromType(_a) {
    var _b, _c;
    var type = _a.type, descriptor = _a.descriptor;
    if (type === 'script') {
        this.callback(null, (_b = descriptor.script) === null || _b === void 0 ? void 0 : _b.content, descriptor.script.map);
        return;
    }
    else if (type === 'style') {
        this.resourcePath += '.less';
        // console.log(this.)
        var content = descriptor.styles.map(function (style) { return style.content; }).join('\n');
        this.callback(null, "export default `" + content + "`");
        return;
    }
    else if (type === 'template') {
        this.callback(null, "export default `" + ((_c = descriptor.template) === null || _c === void 0 ? void 0 : _c.content) + "`", descriptor.template.map);
        return;
    }
    return;
}
