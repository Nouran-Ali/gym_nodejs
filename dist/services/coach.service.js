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
const ExcludePassword_1 = require("../helpers/ExcludePassword");
const prisma_1 = __importDefault(require("../infrastructure/database/prisma"));
class CoachService {
    createCoach(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.create({ data });
        });
    }
    checkIfDuplicate(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.findUnique({
                where: {
                    phoneNumber,
                },
            });
        });
    }
    getCoaches() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.findMany({
                select: ExcludePassword_1.AdminWithoutPassword,
            });
        });
    }
    getCoachById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.findUnique({
                where: { id },
                select: ExcludePassword_1.AdminWithoutPassword,
            });
        });
    }
    updateCoach(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.update({
                where: { id },
                data,
                select: ExcludePassword_1.AdminWithoutPassword,
            });
        });
    }
    deleteCoach(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.coach.delete({ where: { id } });
        });
    }
}
exports.default = new CoachService();
