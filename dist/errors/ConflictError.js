"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
// ConflictError.ts
const AppError_1 = require("./AppError");
class ConflictError extends AppError_1.AppError {
    constructor(message, errors) {
        super(409, message, errors);
        this.name = this.constructor.name;
    }
}
exports.ConflictError = ConflictError;
