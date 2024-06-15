"use strict";
// src/middlewares/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../errors/AppError");
function errorHandler(err, req, res, next) {
    if (err instanceof AppError_1.AppError) {
        res
            .status(err.statusCode)
            .json({ message: err.message, errors: err.errors });
    }
    else {
        console.error(err);
        res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', errors: {} });
    }
}
exports.errorHandler = errorHandler;
