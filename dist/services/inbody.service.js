"use strict";
// src/services/inbody.service.ts
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
const prisma_1 = __importDefault(require("../infrastructure/database/prisma"));
const trainee_service_1 = __importDefault(require("./trainee.service"));
const NotFoundError_1 = require("../errors/NotFoundError");
class InBodyService {
    createInBody(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const found = yield trainee_service_1.default.getTraineeById(dto.traineeId);
            if (!found)
                throw new NotFoundError_1.NotFoundError('Trainee not found');
            const data = Object.assign(Object.assign({}, dto), { dietFile: dto.dietFile ? `inbodies/${(_a = dto.dietFile) === null || _a === void 0 ? void 0 : _a.filename}` : undefined });
            return prisma_1.default.inBody.create({
                data,
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.inBody.findMany({
                orderBy: {
                    date: 'desc', // Sort by date in descending order
                },
            });
        });
    }
}
exports.default = new InBodyService();
