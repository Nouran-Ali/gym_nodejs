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
const Bcrypt_1 = require("./../helpers/Bcrypt");
const coach_service_1 = __importDefault(require("../services/coach.service"));
const ConflictError_1 = require("../errors/ConflictError");
class CoachController {
    createCoach(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructure confirm_password from request body
                const _a = req.body, { confirm_password } = _a, coachData = __rest(_a, ["confirm_password"]);
                // Ensure dob is converted to Date object
                coachData.dob = new Date(coachData.dob);
                // Hash password using Bcrypt
                const hashedPassword = yield Bcrypt_1.Bcrypt.hash(coachData.password);
                // Replace plain password with hashed password in coachData
                const data = Object.assign(Object.assign({}, coachData), { password: hashedPassword });
                const duplicate = yield coach_service_1.default.checkIfDuplicate(data.phoneNumber);
                if (duplicate) {
                    next(new ConflictError_1.ConflictError('Phone number already exists'));
                }
                // Call CoachService to create coach
                const _b = yield coach_service_1.default.createCoach(data), { password } = _b, coach = __rest(_b, ["password"]);
                // Return created coach
                res.status(201).json(coach);
            }
            catch (error) {
                // Handle errors
                console.log(error);
                next(error);
            }
        });
    }
    updateCoach(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield coach_service_1.default.updateCoach(+req.params.id, req.body);
                res.status(200).json(coach);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCoach(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield coach_service_1.default.deleteCoach(+req.params.id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCoach(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield coach_service_1.default.getCoachById(+req.params.id);
                res.status(200).json(coach);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllCoaches(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coaches = yield coach_service_1.default.getCoaches();
                res.status(200).json(coaches);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CoachController();
