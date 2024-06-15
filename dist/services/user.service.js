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
const prisma_1 = __importDefault(require("../infrastructure/database/prisma"));
class UserService {
    findUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const coach = yield prisma_1.default.coach.findUnique({ where: { phoneNumber } });
            if (coach)
                return Object.assign(Object.assign({}, coach), { userType: 'COACH' });
            const secretary = yield prisma_1.default.secretary.findUnique({
                where: { phoneNumber },
            });
            if (secretary)
                return Object.assign(Object.assign({}, secretary), { userType: 'SECRETARY' });
            const trainee = yield prisma_1.default.trainee.findUnique({ where: { phoneNumber } });
            if (trainee)
                return Object.assign(Object.assign({}, trainee), { userType: 'TRAINEE' });
            return null;
        });
    }
    findUserById(id, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (userType === 'COACH') {
                user = yield prisma_1.default.coach.findUnique({
                    where: { id },
                });
            }
            else if (userType === 'SECRETARY') {
                user = yield prisma_1.default.secretary.findUnique({
                    where: { id },
                });
            }
            else if (userType === 'TRAINEE') {
                user = yield prisma_1.default.trainee.findUnique({
                    where: { id },
                    include: {
                        inBodies: true,
                    },
                });
            }
            if (user) {
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return userWithoutPassword;
            }
            return null;
        });
    }
}
exports.default = new UserService();
