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
exports.UpdateSecretaryDTO = exports.CreateSecretaryDTO = void 0;
const class_validator_1 = require("class-validator");
const MatchDecorator_1 = require("../helpers/MatchDecorator");
const isDateFormat_1 = require("../helpers/isDateFormat");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (Gender = {}));
class CreateSecretaryDTO {
    constructor(phoneNumber, fullName, gender, dob, password, confirm_password) {
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.gender = gender;
        this.dob = dob;
        this.password = password;
        this.confirm_password = confirm_password;
    }
}
exports.CreateSecretaryDTO = CreateSecretaryDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name is required' }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Gender, { message: 'Gender must be either MALE or FEMALE' }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Date of birth must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date of birth is required' }),
    (0, class_validator_1.Validate)(isDateFormat_1.IsDateFormat, {
        message: 'Invalid date format. Date must be in YYYY-MM-DD format',
    }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Confirm password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Confirm password is required' }),
    (0, MatchDecorator_1.Match)('password', { message: 'Passwords must match' }),
    __metadata("design:type", String)
], CreateSecretaryDTO.prototype, "confirm_password", void 0);
class UpdateSecretaryDTO {
}
exports.UpdateSecretaryDTO = UpdateSecretaryDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    __metadata("design:type", String)
], UpdateSecretaryDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    __metadata("design:type", String)
], UpdateSecretaryDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Gender, { message: 'Gender must be either MALE or FEMALE' }),
    __metadata("design:type", String)
], UpdateSecretaryDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Date of birth must be a string' }),
    (0, class_validator_1.Validate)(isDateFormat_1.IsDateFormat, {
        message: 'Invalid date format. Date must be in YYYY-MM-DD format',
    }),
    __metadata("design:type", String)
], UpdateSecretaryDTO.prototype, "dob", void 0);
