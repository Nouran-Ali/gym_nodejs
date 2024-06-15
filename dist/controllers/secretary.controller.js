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
const secretary_service_1 = __importDefault(require("../services/secretary.service"));
const Bcrypt_1 = require("./../helpers/Bcrypt");
class SecretaryController {
    createSecretary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _a = req.body, { confirm_password } = _a, secretaryData = __rest(_a, ["confirm_password"]);
                const data = Object.assign(Object.assign({}, secretaryData), { dob: new Date(secretaryData.dob), password: yield Bcrypt_1.Bcrypt.hash(secretaryData.password) });
                const _b = yield secretary_service_1.default.createSecretary(data), { password } = _b, secretary = __rest(_b, ["password"]);
                res.status(201).json(secretary);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSecretaries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secretaries = yield secretary_service_1.default.getSecretaries();
                res.status(200).json(secretaries.map((_a) => {
                    var { password } = _a, rest = __rest(_a, ["password"]);
                    return rest;
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSecretaryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const secretary = yield secretary_service_1.default.getSecretaryById(+id);
                res.status(200).json(secretary);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateSecretary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let secretaryData = req.body;
                const secretary = yield secretary_service_1.default.updateSecretary(+id, Object.assign({}, secretaryData));
                res.status(200).json(secretary);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteSecretary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield secretary_service_1.default.deleteSecretary(Number(id));
                res.status(200).json({ message: 'Secretary deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SecretaryController();
