"use strict";
// swaggerAutoGen.config.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const swaggerGenerator = () => __awaiter(void 0, void 0, void 0, function* () {
    const swaggerAutogenInstance = (0, swagger_autogen_1.default)();
    const doc = {
        info: {
            title: 'Power Pulse Gym API Documentation',
            description: 'API documentation for Power Pulse Gym',
        },
        host: '127.0.0.1:5000/api/v1',
        schemes: ['http'],
        securityDefinitions: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        definitions: {
            // Define request body schemas here
            CreateSecretaryRequestBody: {
                type: 'object',
                properties: {
                    phoneNumber: { type: 'string' },
                    fullName: { type: 'string' },
                    gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
                    dob: { type: 'string', format: 'date' },
                    password: { type: 'string' },
                    confirm_password: { type: 'string' },
                },
                required: [
                    'phoneNumber',
                    'fullName',
                    'gender',
                    'dob',
                    'password',
                    'confirm_password',
                ],
            },
            UpdateSecretaryRequestBody: {
                type: 'object',
                properties: {
                    phoneNumber: { type: 'string' },
                    fullName: { type: 'string' },
                    gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
                    dob: { type: 'string', format: 'date' },
                    password: { type: 'string' },
                },
            },
        },
        paths: {
            // Associate request body schemas with routes
            '/secretaries': {
                post: {
                    summary: 'Create a new secretary',
                    description: 'Endpoint to create a new secretary',
                    consumes: ['application/json'],
                    produces: ['application/json'],
                    parameters: [
                        {
                            in: 'body',
                            name: 'body',
                            description: 'Secretary data to create',
                            required: true,
                            schema: {
                                $ref: '#/definitions/CreateSecretaryRequestBody',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Successful operation',
                        },
                        // Add other response codes if needed
                    },
                },
            },
            '/secretaries/{id}': {
                put: {
                    summary: 'Update an existing secretary',
                    description: 'Endpoint to update an existing secretary',
                    consumes: ['application/json'],
                    produces: ['application/json'],
                    parameters: [
                        {
                            in: 'body',
                            name: 'body',
                            description: 'Updated secretary data',
                            required: true,
                            schema: {
                                $ref: '#/definitions/UpdateSecretaryRequestBody',
                            },
                        },
                        {
                            in: 'path',
                            name: 'id',
                            description: 'ID of the secretary to update',
                            required: true,
                            type: 'string',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Successful operation',
                        },
                        // Add other response codes if needed
                    },
                },
            },
            // Define paths for other routes similarly
        },
    };
    const outputFile = path_1.default.resolve(__dirname, '../..', 'swagger-output.json');
    const endpointsFiles = ['../routes/v1/*.ts']; // Add other route files if needed
    const result = yield swaggerAutogenInstance(outputFile, endpointsFiles, doc);
    if (!result.success) {
        console.error('Error generating Swagger documentation:', result.error);
    }
    else {
        console.log('Swagger documentation generated successfully:', outputFile);
    }
});
swaggerGenerator();
