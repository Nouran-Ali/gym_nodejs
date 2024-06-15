"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// Read all files in the current directory
const files = fs_1.default.readdirSync(__dirname);
files.forEach((file) => {
    // Skip the index file itself
    if (file !== 'index.ts' && file !== 'index.js') {
        // Get the file's full path
        const filePath = path_1.default.join(__dirname, file);
        // Import the route file (support both .ts and .js extensions)
        let route;
        if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
            route = require(filePath).default;
        }
        // Use the route (assuming each route file exports an Express router)
        if (route && typeof route === 'function') {
            router.use(route);
        }
    }
});
exports.default = router;
