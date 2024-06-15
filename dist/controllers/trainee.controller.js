"use strict";
// src/controllers/trainee.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeController = void 0;
const trainee_service_1 = __importDefault(require("../services/trainee.service"));
const NotFoundError_1 = require("../errors/NotFoundError");
const BadRequestError_1 = require("../errors/BadRequestError");
class TraineeController {
    getTrainees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainees = yield trainee_service_1.default.getTrainees();
                res.status(200).json(trainees);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTraineeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const trainee = yield trainee_service_1.default.getTraineeById(id);
                if (!trainee) {
                    next(new NotFoundError_1.NotFoundError('Trainee not found'));
                    return;
                }
                res.status(200).json(trainee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createTrainee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainee = req.dtoInstance;
                const idImgs = req.files;
                // Validate files presence
                if (!idImgs || !idImgs.idFace || !idImgs.idBack) {
                    throw new BadRequestError_1.BadRequestError({
                        idImages: ['idFace and idBack are required'],
                    });
                }
                // Extract S3 file keys (or URLs)
                const idFaceKey = idImgs.idFace[0].key; // Or idImgs.idFace[0].location if you prefer the full URL
                const idBackKey = idImgs.idBack[0].key; // Or idImgs.idBack[0].location if you prefer the full URL
                // Add file keys to trainee data
                const traineeData = Object.assign(Object.assign({}, trainee), { idFace: idFaceKey, idBack: idBackKey });
                const _a = yield trainee_service_1.default.createTrainee(traineeData), { password } = _a, newTrainee = __rest(_a, ["password"]);
                res.status(201).json(newTrainee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTrainee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const trainee = req.dtoInstance;
                const _a = yield trainee_service_1.default.updateTrainee(+id, trainee), { password } = _a, newTrainee = __rest(_a, ["password"]);
                res.status(201).json(newTrainee);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TraineeController = TraineeController;
exports.default = new TraineeController();
