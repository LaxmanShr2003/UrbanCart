"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("../lib/hash");
var multer_1 = __importDefault(require("multer"));
var path = __importStar(require("path"));
var MulterHelper = (function () {
    function MulterHelper() {
    }
    MulterHelper.diskstorage = function (path, moduleName) {
        return multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path);
            },
            filename: function (req, file, cb) {
                var extension = file.originalname.split(".").pop();
                cb(null, "".concat(moduleName, "-").concat((0, hash_1.Unique)(), ".").concat(extension));
            },
        });
    };
    MulterHelper.getstorage = function (path, options) {
        if (options === void 0) { options = {
            limits: { fileSize: 4 * 1024 * 1024 },
            moduleName: "default",
        }; }
        return (0, multer_1.default)({
            storage: this.diskstorage(path, options.moduleName),
            limits: options.limits,
            fileFilter: this.fileFilter({ isFile: options.isFile }),
        });
    };
    MulterHelper.fileFilter = function (options) {
        if (options === void 0) { options = { isFile: false }; }
        try {
            return function (req, file, cb) {
                var filetypes = options.isFile
                    ? /pdf|docx|xlxs|csv/g
                    : /png|jpeg|jpg/;
                var extension = filetypes.test(path.extname(file.originalname).toLowerCase());
                var mimetype = filetypes.test(file.mimetype);
                if (extension && mimetype) {
                    cb(null, true);
                }
                else {
                    cb(new Error(options.isFile ? "Error: Files only" : "Error: Images only"));
                }
            };
        }
        catch (error) {
            throw error;
        }
    };
    return MulterHelper;
}());
exports.default = MulterHelper;
//# sourceMappingURL=multer.js.map