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
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Bcrypt_1 = require("../helpers/Bcrypt");
const user_service_1 = __importDefault(require("./user.service"));
class AuthService {
    Login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.findUserByPhoneNumber(login.phoneNumber);
            if (!user)
                throw new UnauthorizedError_1.UnauthorizedError('Bad credentials');
            const isPasswordValid = yield Bcrypt_1.Bcrypt.compare(login.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError_1.UnauthorizedError('Bad credentials');
            }
            return user;
        });
    }
}
exports.default = new AuthService();
