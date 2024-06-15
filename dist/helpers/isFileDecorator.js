"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFile = void 0;
const class_validator_1 = require("class-validator");
function IsFile(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return value instanceof Object && 'originalname' in value;
                },
                defaultMessage(args) {
                    return `${args.property} must be a file`;
                },
            },
        });
    };
}
exports.IsFile = IsFile;
