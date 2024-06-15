"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const v1_1 = __importDefault(require("./routes/v1"));
const errorHandler_1 = require("./middlewares/errorHandler");
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importStar(require("./config/swaggerConfig"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || 'localhost';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// routes for api/v1
app.use('/', homeRoutes_1.default);
app.use('/api/v1', v1_1.default);
// swagger api documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default, swaggerConfig_1.swaggerUiOptions));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(errorHandler_1.errorHandler);
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
