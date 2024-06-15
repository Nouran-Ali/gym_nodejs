"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
// ForbiddenError.ts
const AppError_1 = require("./AppError");
class ForbiddenError extends AppError_1.AppError {
    constructor(message, errors) {
        super(403, message, errors);
        this.name = this.constructor.name;
    }
}
exports.ForbiddenError = ForbiddenError;
