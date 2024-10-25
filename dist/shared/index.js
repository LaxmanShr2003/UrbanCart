"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
var express_1 = require("express");
var user_routes_1 = require("../module/User/routes/user.routes");
var category_routes_1 = require("../module/category/routes/category.routes");
var subCategory_routes_1 = require("../module/subCategory/routes/subCategory.routes");
var routers = function (app) {
    var router = (0, express_1.Router)();
    (0, user_routes_1.userRoutes)(router);
    (0, category_routes_1.categoryRouters)(router);
    (0, subCategory_routes_1.subCategoryRouters)(router);
    app.use("/api", router);
};
exports.routers = routers;
//# sourceMappingURL=index.js.map