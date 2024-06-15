"use strict";
// src/services/attendance.service.ts
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
const ExcludePassword_1 = require("../helpers/ExcludePassword");
const trainee_service_1 = __importDefault(require("./trainee.service"));
const NotFoundError_1 = require("../errors/NotFoundError");
const BadRequestError_1 = require("../errors/BadRequestError");
const class_transformer_1 = require("class-transformer");
const trainee_dto_1 = require("../dtos/trainee.dto");
class AttendanceService {
    createAttendance(parcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield trainee_service_1.default.getTraineeByParcode(parcode);
            if (!trainee)
                throw new NotFoundError_1.NotFoundError('Could not find trainee');
            if (trainee.remainingClasses === 0)
                throw new BadRequestError_1.BadRequestError({
                    remainingClasses: ['You have finished your subscription classes'],
                });
            yield trainee_service_1.default.updateTrainee(trainee.id, (0, class_transformer_1.plainToInstance)(trainee_dto_1.UpdateTraineeDTO, {
                subscriptionStatus: trainee.remainingClasses - 1 === 0 ? 'INACTIVE' : 'ACTIVE',
                remainingClasses: trainee.remainingClasses - 1,
            }));
            return prisma_1.default.attendance.create({
                data: { traineeId: trainee.id },
            });
        });
    }
    getAllAttendances() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.attendance.findMany({
                include: {
                    trainee: {
                        select: ExcludePassword_1.TraineeWithoutPassword,
                    },
                },
            });
        });
    }
    getAttendanceByTraineeId(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.attendance.findMany({
                where: {
                    traineeId,
                },
            });
        });
    }
}
exports.default = new AttendanceService();
