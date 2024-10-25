"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeExpressServer = void 0;
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var env_config_1 = require("./env.config");
var path_1 = __importDefault(require("path"));
var shared_1 = require("../shared");
var errorHandler_1 = __importDefault(require("../Helpers/errorHandler"));
var initializeExpressServer = function (app) {
    app.use("/static/", express_1.default.static(path_1.default.join(process.env.ASSETS_BASE_PATH, "/public/")));
    app.use(express_1.default.json({ limit: "5mb" }));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, morgan_1.default)("dev"));
    app.use(helmet_1.default.xssFilter());
    app.disable("x-powered-by");
    (0, shared_1.routers)(app);
    app.use((0, errorHandler_1.default)());
    var PORT = env_config_1.environment.SERVER_PORT;
    app.listen(PORT, function () {
        console.log("server is running at port ".concat(PORT));
    });
};
exports.initializeExpressServer = initializeExpressServer;
//# sourceMappingURL=express.config.js.map