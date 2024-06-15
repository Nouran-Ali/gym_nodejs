"use strict";
// src/controllers/inbody.controller.ts
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
exports.InBodyController = void 0;
const inbody_service_1 = __importDefault(require("../services/inbody.service"));
class InBodyController {
    createInBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let inBodyData = req.dtoInstance;
                const newInBody = yield inbody_service_1.default.createInBody(inBodyData);
                res.status(201).json(newInBody);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inbodies = yield inbody_service_1.default.getAll();
                res.status(200).json(inbodies);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.InBodyController = InBodyController;
exports.default = new InBodyController();
