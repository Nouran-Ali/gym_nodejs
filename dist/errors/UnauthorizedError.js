"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
// UnauthorizedError.ts
const AppError_1 = require("./AppError");
class UnauthorizedError extends AppError_1.AppError {
    constructor(message, errors) {
        super(401, message, errors);
        this.name = this.constructor.name;
    }
}
exports.UnauthorizedError = UnauthorizedError;
