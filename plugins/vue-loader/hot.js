"use strict";
exports.__esModule = true;
exports.hot = void 0;
function hot(code) {
    return code + "\n  /* hot reload */\n  if (module.hot) {\n    console.log('hot')\n  }\n  ";
}
exports.hot = hot;
