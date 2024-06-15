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
const Jwt_1 = require("../helpers/Jwt");
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = req.body;
                const user = yield auth_service_1.default.Login(login);
                const token = (0, Jwt_1.generateToken)({
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                    userType: user.userType,
                });
                res.status(200).json({ seccess: true, token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedUser = req.user;
                console.log('🚀 ~ AuthController ~ me ~ decodedUser:', decodedUser);
                let user = yield user_service_1.default.findUserById(+decodedUser.id, decodedUser.userType);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
