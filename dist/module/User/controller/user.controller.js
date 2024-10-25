"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var user_service_1 = require("../service/user.service");
var messageFormater_1 = require("../../../lib/messageFormater");
var global_1 = require("../../../types/global");
var ExceptionHandler_1 = __importDefault(require("../../../Helpers/ExceptionHandler"));
exports.userController = {
    createUser: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userData, files, profiles, user, response, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    userData = req.body;
                    files = req.files;
                    if (!files)
                        throw new Error("Profile image is required");
                    profiles = (_a = files === null || files === void 0 ? void 0 : files.profile) === null || _a === void 0 ? void 0 : _a[0];
                    user = __assign(__assign({}, userData), { image: profiles.filename });
                    return [4, user_service_1.userService.createUser(user)];
                case 1:
                    response = _b.sent();
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "User created successfully"));
                    return [3, 3];
                case 2:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    login: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, response, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4, user_service_1.userService.userLogin(email, password)];
                case 1:
                    response = _b.sent();
                    if (!response)
                        throw new Error("login failed");
                    res.status(200).json((0, messageFormater_1.formatMessage)(true, response, "Login successful"));
                    return [3, 3];
                case 2:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    createAdmin: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userData, files, profiles, user, response, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    userData = req.body;
                    files = req.files;
                    profiles = (_a = files === null || files === void 0 ? void 0 : files.profile) === null || _a === void 0 ? void 0 : _a[0];
                    if (!files)
                        throw new Error("Profile image is required");
                    user = __assign(__assign({}, userData), { image: profiles.filename, role: global_1.UserRole.ADMIN });
                    return [4, user_service_1.userService.createUser(user)];
                case 1:
                    response = _b.sent();
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "Admin created successfully"));
                    return [3, 3];
                case 2:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    createEmployee: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userData, files, profiles, user, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userData = req.body;
                    files = req.files;
                    profiles = files === null || files === void 0 ? void 0 : files.profile[0];
                    if (!files)
                        throw new Error("Profile image is required");
                    user = __assign(__assign({}, userData), { image: profiles.filename, role: global_1.UserRole.EMPLOYEE });
                    return [4, user_service_1.userService.createUser(user)];
                case 1:
                    response = _a.sent();
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "Employee created successfully"));
                    return [3, 3];
                case 2:
                    error_4 = _a.sent();
                    next(error_4);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    getById: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.id;
                    return [4, user_service_1.userService.findUserById(userId)];
                case 1:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("User not found", 400);
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "Successfully fetched user"));
                    return [3, 3];
                case 2:
                    error_5 = _a.sent();
                    next(error_5);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    findAllUsers: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, user_service_1.userService.findUsers()];
                case 1:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("No users found", 400);
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "Successfully fetched all users"));
                    return [3, 3];
                case 2:
                    error_6 = _a.sent();
                    next(error_6);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    updateUser: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, userData, files, profiles, user, response, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(req.body);
                    userId = req.params.id;
                    userData = req.body;
                    files = req.files;
                    profiles = files === null || files === void 0 ? void 0 : files.profile[0];
                    user = __assign(__assign({}, userData), { image: profiles.filename });
                    return [4, user_service_1.userService.updateUser(userId, user)];
                case 1:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("Unable to update user data", 400);
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, response, "Successfully updated user data"));
                    return [3, 3];
                case 2:
                    error_7 = _a.sent();
                    next(error_7);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
    removeUser: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.id;
                    return [4, user_service_1.userService.removeUser(userId)];
                case 1:
                    response = _a.sent();
                    if (!response)
                        throw new Error("Unable to delete user data");
                    res
                        .status(200)
                        .json((0, messageFormater_1.formatMessage)(true, "User data deleted successfully"));
                    return [3, 3];
                case 2:
                    error_8 = _a.sent();
                    next(error_8);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); },
};
//# sourceMappingURL=user.controller.js.map