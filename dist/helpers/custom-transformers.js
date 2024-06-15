"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeModel = exports.transformDateToString = exports.transformStringToDate = exports.transformStringToObject = void 0;
function transformStringToObject(value) {
    if (typeof value === 'string') {
        return null;
    }
    return value;
}
exports.transformStringToObject = transformStringToObject;
function transformStringToDate(value) {
    return value && value.substring ? new Date(value.substring(0, 10)) : value;
}
exports.transformStringToDate = transformStringToDate;
function transformDateToString(value) {
    if (value && value.getDate && value.getMonth && value.getFullYear) {
        const curr_date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
        const curr_month = value.getMonth() + 1 < 10
            ? `0${value.getMonth() + 1}`
            : value.getMonth() + 1;
        const curr_year = value.getFullYear();
        return curr_year + '-' + curr_month + '-' + curr_date;
    }
    return value;
}
exports.transformDateToString = transformDateToString;
function serializeModel(object) {
    return function () {
        return object;
    };
}
exports.serializeModel = serializeModel;
