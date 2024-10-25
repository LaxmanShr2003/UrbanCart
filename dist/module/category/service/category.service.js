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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
var ExceptionHandler_1 = __importDefault(require("../../../Helpers/ExceptionHandler"));
var ORMHelper_1 = __importDefault(require("../../../Helpers/ORMHelper"));
var category_repository_1 = require("../repository/category.repository");
exports.categoryService = {
    create: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var runner, categoryName, isNameExists, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ORMHelper_1.default.createQueryRunner()];
                case 1:
                    runner = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 7]);
                    categoryName = data.categoryName;
                    return [4, category_repository_1.categoryRepository.findByName({
                            runner: runner,
                            categoryName: categoryName,
                        })];
                case 3:
                    isNameExists = _a.sent();
                    if (isNameExists)
                        throw new Error("Category name already exists");
                    return [4, category_repository_1.categoryRepository.create({ runner: runner, data: data })];
                case 4:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("Unable to save categrory data", 400);
                    return [2, response];
                case 5:
                    error_1 = _a.sent();
                    throw error_1;
                case 6:
                    runner.release();
                    return [7];
                case 7: return [2];
            }
        });
    }); },
    getById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var runner, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ORMHelper_1.default.createQueryRunner()];
                case 1:
                    runner = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4, category_repository_1.categoryRepository.findById({ runner: runner, id: id })];
                case 3:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("Category not found", 404);
                    return [2, response];
                case 4:
                    error_2 = _a.sent();
                    throw error_2;
                case 5:
                    runner.release();
                    return [7];
                case 6: return [2];
            }
        });
    }); },
    findAll: function () { return __awaiter(void 0, void 0, void 0, function () {
        var runner, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ORMHelper_1.default.createQueryRunner()];
                case 1:
                    runner = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4, category_repository_1.categoryRepository.find({ runner: runner })];
                case 3:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("No category found", 404);
                    return [2, response];
                case 4:
                    error_3 = _a.sent();
                    throw error_3;
                case 5:
                    runner.release();
                    return [7];
                case 6: return [2];
            }
        });
    }); },
    removeCategory: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var runner, isIdExists, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ORMHelper_1.default.createQueryRunner()];
                case 1:
                    runner = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4, category_repository_1.categoryRepository.findById({ runner: runner, id: id })];
                case 3:
                    isIdExists = _a.sent();
                    if (!isIdExists)
                        throw new Error("No category found");
                    return [4, category_repository_1.categoryRepository.remove({ runner: runner, id: id })];
                case 4:
                    response = _a.sent();
                    if (response.affected === 0)
                        throw new Error("Unable to delete the category data");
                    return [2, response];
                case 5:
                    error_4 = _a.sent();
                    throw error_4;
                case 6: return [2];
            }
        });
    }); },
    updateCategory: function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
        var runner, categoryName, isIdExists, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ORMHelper_1.default.createQueryRunner()];
                case 1:
                    runner = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 7]);
                    categoryName = data.categoryName;
                    return [4, category_repository_1.categoryRepository.findById({ runner: runner, id: id })];
                case 3:
                    isIdExists = _a.sent();
                    if (!isIdExists)
                        throw new ExceptionHandler_1.default("Category doesnot exists", 400);
                    if (categoryName == isIdExists.categoryName)
                        throw new Error("Category name already exists or cannot be dublicate");
                    return [4, category_repository_1.categoryRepository.update({ runner: runner, data: data, id: id })];
                case 4:
                    response = _a.sent();
                    if (!response)
                        throw new ExceptionHandler_1.default("Unable to update the category data", 400);
                    return [2, response];
                case 5:
                    error_5 = _a.sent();
                    throw error_5;
                case 6:
                    runner.release();
                    return [7];
                case 7: return [2];
            }
        });
    }); },
};
//# sourceMappingURL=category.service.js.map