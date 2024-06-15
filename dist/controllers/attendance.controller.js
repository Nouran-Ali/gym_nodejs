"use strict";
// src/controllers/attendance.controller.ts
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
const attendance_service_1 = __importDefault(require("../services/attendance.service"));
class AttendanceController {
    createAttendance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { parcode } = req.params;
                const newAttendee = yield attendance_service_1.default.createAttendance(parcode);
                res.status(201).json(newAttendee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllAttendances(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield attendance_service_1.default.getAllAttendances();
                res.status(200).json(attendances);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAttendanceByTraineeId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { traineeId } = req.params;
                const attendances = yield attendance_service_1.default.getAttendanceByTraineeId(+traineeId);
                res.status(200).json(attendances);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AttendanceController();
