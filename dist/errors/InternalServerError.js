"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
// InternalServerError.ts
const AppError_1 = require("./AppError");
class InternalServerError extends AppError_1.AppError {
    constructor(message, errors) {
        super(500, message, errors);
        this.name = this.constructor.name;
    }
}
exports.InternalServerError = InternalServerError;
