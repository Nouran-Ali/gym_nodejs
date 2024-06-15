"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/secretary.service.ts
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
const ExcludePassword_1 = require("../helpers/ExcludePassword");
const prisma_1 = __importDefault(require("../infrastructure/database/prisma"));
class SecretaryService {
    createSecretary(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicate = yield this.checkIfDuplicate(data.phoneNumber);
            if (duplicate)
                throw new ConflictError_1.ConflictError('Phone number already exists');
            return yield prisma_1.default.secretary.create({ data });
        });
    }
    checkIfDuplicate(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretary = yield prisma_1.default.secretary.findUnique({
                where: { phoneNumber },
            });
            return !!secretary;
        });
    }
    getSecretaries() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.secretary.findMany({ select: ExcludePassword_1.AdminWithoutPassword });
        });
    }
    getSecretaryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretary = yield prisma_1.default.secretary.findUnique({
                where: { id },
                select: ExcludePassword_1.AdminWithoutPassword,
            });
            if (!secretary) {
                throw new NotFoundError_1.NotFoundError('Secretary not found');
            }
            return secretary;
        });
    }
    updateSecretary(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const actual_data = Object.assign({}, data);
            if (data.dob) {
                data.dob = new Date(actual_data.dob);
            }
            return yield prisma_1.default.secretary.update({
                where: { id },
                data,
                select: ExcludePassword_1.AdminWithoutPassword,
            });
        });
    }
    deleteSecretary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretary = yield this.getSecretaryById(id);
            if (!secretary) {
                throw new NotFoundError_1.NotFoundError('Secretary not found');
            }
            return yield prisma_1.default.secretary.delete({ where: { id } });
        });
    }
}
exports.default = new SecretaryService();
