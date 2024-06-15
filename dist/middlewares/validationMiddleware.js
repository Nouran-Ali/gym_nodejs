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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BadRequestError_1 = require("../errors/BadRequestError");
const validationMiddleware = (DtoClass) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(DtoClass, Object.assign(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query), req.files));
        const errors = yield (0, class_validator_1.validate)(dtoInstance);
        if (errors.length > 0) {
            const errorObject = {};
            errors.forEach((error) => {
                const propertyName = error.property;
                const constraints = error.constraints || {};
                errorObject[propertyName] = Object.values(constraints);
            });
            next(new BadRequestError_1.BadRequestError(errorObject));
            return;
        }
        req.dtoInstance = dtoInstance;
        next();
    });
};
exports.default = validationMiddleware;
