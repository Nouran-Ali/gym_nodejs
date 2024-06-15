"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
// NotFoundError.ts
const AppError_1 = require("./AppError");
class NotFoundError extends AppError_1.AppError {
    constructor(message, errors) {
        super(404, message, errors);
        this.name = this.constructor.name;
    }
}
exports.NotFoundError = NotFoundError;
