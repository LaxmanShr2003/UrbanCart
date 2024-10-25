"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var validateToken_1 = require("../../../auth/validateToken");
var user_schema_1 = require("../schema/user.schema");
var zod_validation_1 = __importDefault(require("../../../middleware/zod.validation"));
var multer_1 = __importDefault(require("../../../middleware/multer"));
var user_profiles_1 = require("../../../utils/user.profiles");
var user_controller_1 = require("../controller/user.controller");
var userRoutes = function (router) {
    router.post("/user/customer", (0, validateToken_1.validateToken)({ checkAdmin: true }), multer_1.default.getstorage(process.env.ACCESS_PATH, {
        isFile: false,
        moduleName: "/uploads",
    }).fields(__spreadArray([], user_profiles_1.userProfiles, true)), zod_validation_1.default.requestParser({
        schema: user_schema_1.userSchema,
        type: "Body",
        isFile: true,
    }), user_controller_1.userController.createUser);
    router.post("/user/employee", (0, validateToken_1.validateToken)({ checkAdmin: true }), multer_1.default.getstorage(process.env.ACCESS_PATH, {
        isFile: false,
        moduleName: "/uploads",
    }).fields(__spreadArray([], user_profiles_1.userProfiles, true)), zod_validation_1.default.requestParser({
        schema: user_schema_1.userSchema,
        type: "Body",
        isFile: false,
    }), user_controller_1.userController.createEmployee);
    router.post("/user/admin", (0, validateToken_1.validateToken)({ checkAdmin: true }), multer_1.default.getstorage(process.env.ACCESS_PATH, {
        isFile: false,
        moduleName: "/uploads",
    }).fields(__spreadArray([], user_profiles_1.userProfiles, true)), zod_validation_1.default.requestParser({
        schema: user_schema_1.userSchema,
        type: "Body",
        isFile: false,
    }), user_controller_1.userController.createAdmin);
    router.get("/user/:id", (0, validateToken_1.validateToken)({ checkAdmin: true }), zod_validation_1.default.requestParser({
        schema: user_schema_1.userIdScheama,
        type: "Params",
        isFile: false,
    }), user_controller_1.userController.getById);
    router.get("/users", (0, validateToken_1.validateToken)({ checkAdmin: true }), user_controller_1.userController.findAllUsers);
    router.patch("/user/update/:id", (0, validateToken_1.validateToken)({ checkAdmin: true }), multer_1.default.getstorage(process.env.ACCESS_PATH, {
        isFile: false,
        moduleName: "user",
    }).fields(__spreadArray([], user_profiles_1.userProfiles, true)), zod_validation_1.default.requestParser({
        schema: user_schema_1.userSchema,
        type: "Body",
        isFile: false,
    }, {
        schema: user_schema_1.userIdScheama,
        type: "Params",
    }), user_controller_1.userController.updateUser);
    router.delete("/user/delete/:id", zod_validation_1.default.requestParser({
        schema: user_schema_1.userIdScheama,
        type: "Params",
    }), user_controller_1.userController.removeUser);
    router.post("/login", user_controller_1.userController.login);
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map