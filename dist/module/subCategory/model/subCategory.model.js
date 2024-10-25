"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.SubCategory = void 0;
var typeorm_1 = require("typeorm");
var baseEntity_1 = require("../../../types/baseEntity");
var category_model_1 = require("../../category/model/category.model");
var SubCategory = (function (_super) {
    __extends(SubCategory, _super);
    function SubCategory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
        }),
        __metadata("design:type", String)
    ], SubCategory.prototype, "subCategoryName", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
        }),
        __metadata("design:type", String)
    ], SubCategory.prototype, "subCategoryDescription", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return category_model_1.Category; }, function (category) { return category.subCategories; }, {
            nullable: false,
            onDelete: "RESTRICT",
        }),
        (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
        __metadata("design:type", category_model_1.Category)
    ], SubCategory.prototype, "category", void 0);
    SubCategory = __decorate([
        (0, typeorm_1.Entity)()
    ], SubCategory);
    return SubCategory;
}(baseEntity_1.BaseEntity));
exports.SubCategory = SubCategory;
//# sourceMappingURL=subCategory.model.js.map