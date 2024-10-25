"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_config_1 = require("./config/express.config");
var orm_config_1 = require("./config/orm.config");
var express_1 = __importDefault(require("express"));
(function main() {
    (0, orm_config_1.intializeDatasource)();
    var app = (0, express_1.default)();
    (0, express_config_1.initializeExpressServer)(app);
})();
//# sourceMappingURL=app.js.map