"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var winston_2 = __importDefault(require("winston"));
var path_1 = __importDefault(require("path"));
var Logger = (0, winston_1.createLogger)({
    transports: [
        new winston_2.default.transports.File({
            filename: path_1.default.join(__dirname, "../../../hope-data/logs", "server.log"),
            format: winston_2.default.format.combine(winston_2.default.format.timestamp(), winston_2.default.format.json()),
        }),
    ],
});
exports.default = Logger;
//# sourceMappingURL=winston.js.map