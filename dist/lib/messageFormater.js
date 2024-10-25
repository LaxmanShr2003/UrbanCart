"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
var formatMessage = function (result, data, message, schema) {
    return {
        success: result,
        data: data,
        schema: schema,
        message: message
    };
};
exports.formatMessage = formatMessage;
//# sourceMappingURL=messageFormater.js.map