"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoachSchema = exports.createCoachSchema = void 0;
// src/dtos/coach.dto.ts
const joi_1 = __importDefault(require("joi"));
exports.createCoachSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string().required(),
    fullName: joi_1.default.string().required(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE').required(),
    dob: joi_1.default.date().required(),
    password: joi_1.default.string().required(),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref('password'))
        .required()
        .messages({
        'any.only': 'Passwords must match',
    }),
});
exports.updateCoachSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string().optional(),
    fullName: joi_1.default.string().optional(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE').optional(),
    dob: joi_1.default.date().optional(),
});
