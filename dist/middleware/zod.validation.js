"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ZOD = (function () {
    function ZOD() {
    }
    var _a;
    _a = ZOD;
    ZOD.requestParser = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var response, _i, args_1, item, error_1;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        response = void 0;
                        _i = 0, args_1 = args;
                        _b.label = 1;
                    case 1:
                        if (!(_i < args_1.length)) return [3, 8];
                        item = args_1[_i];
                        if (!(item.type == "Body")) return [3, 3];
                        return [4, item.schema.safeParseAsync(req.body)];
                    case 2:
                        response = _b.sent();
                        if (response.success) {
                            req.body = response.data;
                        }
                        if (item.isFile) {
                            return [2, next({ success: false, data: response.error.issues })];
                        }
                        if (!response.success) {
                            return [2, next({
                                    success: false,
                                    data: response.error.issues,
                                })];
                        }
                        _b.label = 3;
                    case 3:
                        if (!(item.type == "Params")) return [3, 5];
                        return [4, item.schema.safeParseAsync(req.params)];
                    case 4:
                        response = _b.sent();
                        if (response.success) {
                            req.params = response.data;
                            return [3, 7];
                        }
                        return [2, res
                                .status(400)
                                .send({ success: false, data: response.error.issues })];
                    case 5:
                        if (!(item.type == "Query")) return [3, 7];
                        return [4, item.schema.safeParseAsync(req.query)];
                    case 6:
                        response = _b.sent();
                        if (response.success) {
                            req.query = response.data;
                            return [3, 7];
                        }
                        return [2, res
                                .status(400)
                                .send({ success: false, data: response.error.issues })];
                    case 7:
                        _i++;
                        return [3, 1];
                    case 8:
                        next();
                        return [3, 10];
                    case 9:
                        error_1 = _b.sent();
                        throw error_1;
                    case 10: return [2];
                }
            });
        }); };
    };
    return ZOD;
}());
exports.default = ZOD;
//# sourceMappingURL=zod.validation.js.map