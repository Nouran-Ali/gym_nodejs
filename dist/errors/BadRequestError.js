"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
// BadRequestError.ts
const AppError_1 = require("./AppError");
class BadRequestError extends AppError_1.AppError {
    constructor(errors) {
        super(400, 'VALIDATION_ERROR', errors);
        this.name = this.constructor.name;
    }
}
exports.BadRequestError = BadRequestError;
