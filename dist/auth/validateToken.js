"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.tokenType = void 0;
var env_config_1 = require("../config/env.config");
var token_1 = __importDefault(require("../lib/token"));
exports.tokenType = {
    ACCESS: env_config_1.environment.SECRET_KEY,
};
var validateToken = function (_a) {
    var _b = _a.checkAdmin, checkAdmin = _b === void 0 ? false : _b, _c = _a.checkCustomer, checkCustomer = _c === void 0 ? false : _c, _d = _a.checkEmployee, checkEmployee = _d === void 0 ? false : _d;
    return function (req, res, next) {
        var _a;
        try {
            var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new Error("token missing");
            var decode = token_1.default.verify({
                payload: token,
                secretKey: exports.tokenType.ACCESS,
            });
            if (!decode)
                throw new Error("Token invalid");
            if (!decode || (!checkAdmin && decode.role !== "ADMIN")) {
                new Error("Unauthorized admin");
            }
            if (!decode || (!checkCustomer && decode.role !== "CUSTOMER")) {
                new Error("Unauthorized customer");
            }
            if (!decode || (!checkEmployee && decode.role !== "EMPLOYEE")) {
                new Error("Unauthorized employee");
            }
            req.accessToken = decode;
            next();
        }
        catch (error) {
            throw error;
        }
    };
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map