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
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
const Bcrypt_1 = require("../helpers/Bcrypt");
const ExcludePassword_1 = require("../helpers/ExcludePassword");
const prisma_1 = __importDefault(require("../infrastructure/database/prisma"));
class TraineeService {
    createTrainee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let duplicate = yield this.checkDuplicate(data.parcode, data.phoneNumber);
            if (duplicate)
                throw new ConflictError_1.ConflictError('Phone Number or parcode is already in use');
            const classes = data.subscriptionMonths * data.subscriptionClasses;
            const trainee = Object.assign(Object.assign({}, data), { 
                // modify data to accepted by service
                subscriptionClasses: classes, remainingClasses: classes, password: yield Bcrypt_1.Bcrypt.hash(data.phoneNumber), dob: new Date(data.dob), subscriptionDate: new Date(Date.now()), subscriptionStartDate: new Date(data.subscriptionStartDate), subscriptionEndDate: new Date(new Date(data.subscriptionStartDate).setMonth(new Date(data.subscriptionStartDate).getMonth() +
                    data.subscriptionMonths)) });
            return yield prisma_1.default.trainee.create({ data: trainee });
        });
    }
    checkDuplicate(parcode, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.trainee.findFirst({
                where: {
                    OR: [{ parcode }, { phoneNumber }],
                },
                select: ExcludePassword_1.TraineeWithoutPassword,
            });
        });
    }
    getTrainees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.trainee.findMany({ select: ExcludePassword_1.TraineeWithoutPassword });
        });
    }
    getTraineeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.trainee.findUnique({
                where: { id },
                include: { inBodies: true },
            });
        });
    }
    getTraineeByParcode(parcode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.trainee.findUnique({
                where: { parcode },
            });
        });
    }
    updateTrainee(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.getTraineeById(id);
            if (!found) {
                throw new NotFoundError_1.NotFoundError('Trainee not found');
            }
            let duplicate = yield this.checkDuplicate(dto.parcode, dto.phoneNumber);
            if (duplicate) {
                throw new ConflictError_1.ConflictError('Phone Number or parcode is already in use');
            }
            const data = Object.assign(Object.assign({}, dto), { dob: dto.dob ? new Date(dto.dob) : undefined, subscriptionStartDate: dto.subscriptionStartDate
                    ? new Date(dto.subscriptionStartDate)
                    : undefined, subscriptionEndDate: dto.subscriptionStartDate
                    ? new Date(new Date(dto.subscriptionStartDate).setMonth(new Date(dto.subscriptionStartDate).getMonth() +
                        (dto.subscriptionMonths || 0)))
                    : undefined, subscriptionMonths: dto.subscriptionMonths !== undefined
                    ? +dto.subscriptionMonths
                    : undefined, subscriptionClasses: dto.subscriptionClasses !== undefined
                    ? +dto.subscriptionClasses
                    : undefined, remainingClasses: dto.subscriptionClasses !== undefined
                    ? +dto.subscriptionClasses
                    : undefined, paid: dto.paid !== undefined ? +dto.paid : undefined, reminder: dto.reminder !== undefined ? +dto.reminder : undefined, idFace: dto.idFace ? `trainees/${dto.idFace[0].filename}` : undefined, idBack: dto.idBack ? `trainees/${dto.idBack[0].filename}` : undefined });
            return yield prisma_1.default.trainee.update({
                where: { id },
                data: data,
            });
        });
    }
    deleteTrainee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.trainee.delete({ where: { id } });
        });
    }
}
exports.default = new TraineeService();
