"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
var typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
var typeorm_3 = require("typeorm");
var BaseEntity = (function () {
    function BaseEntity() {
    }
    __decorate([
        (0, typeorm_3.PrimaryColumn)({
            type: "varchar",
            length: 255,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], BaseEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_2.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], BaseEntity.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], BaseEntity.prototype, "updateAt", void 0);
    BaseEntity = __decorate([
        (0, typeorm_3.Entity)()
    ], BaseEntity);
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=baseEntity.js.map