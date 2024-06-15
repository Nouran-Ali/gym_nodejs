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
exports.UpdateInBodyDTO = exports.CreateInBodyDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateInBodyDTO {
}
exports.CreateInBodyDTO = CreateInBodyDTO;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "traineeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "length", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "shoulder", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "chest", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "belowChest", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "middle", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "stomach", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "buttocks", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "thigh", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "arm", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "BMI", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInBodyDTO.prototype, "currentSituation", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "dailyWaterNeed", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "caloriesRequired", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "muscleWeight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "fatMass", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "boneDensity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], CreateInBodyDTO.prototype, "bellyFat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateInBodyDTO.prototype, "dietFile", void 0);
class UpdateInBodyDTO {
}
exports.UpdateInBodyDTO = UpdateInBodyDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "traineeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "length", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "shoulder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "chest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "belowChest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "middle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "stomach", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "buttocks", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "thigh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "arm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "BMI", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInBodyDTO.prototype, "currentSituation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "dailyWaterNeed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "caloriesRequired", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "muscleWeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "fatMass", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "boneDensity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], UpdateInBodyDTO.prototype, "bellyFat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateInBodyDTO.prototype, "dietFile", void 0);
