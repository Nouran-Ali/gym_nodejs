"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTraineeS3 = exports.uploadInbodyS3 = exports.uploadTraineeLocal = exports.uploadInbodyLocal = exports.uploadS3 = exports.uploadLocal = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const region = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AWS_ACCESS_KEY_ID';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY';
// Configure AWS SDK with your credentials
const s3Client = new client_s3_1.S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
// Define local storage for uploaded files
const storage = (uploadDir) => multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the directory exists
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        // Set the file name
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Define S3 storage
const s3Storage = (bucketName) => (0, multer_s3_1.default)({
    s3: s3Client,
    bucket: bucketName,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Initialize multer instances with dynamic storage configuration
const uploadLocal = (uploadDir) => (0, multer_1.default)({ storage: storage(`uploads/${uploadDir}`) });
exports.uploadLocal = uploadLocal;
const uploadS3 = (bucketName) => (0, multer_1.default)({ storage: s3Storage(bucketName) });
exports.uploadS3 = uploadS3;
// Specific upload handlers
exports.uploadInbodyLocal = (0, exports.uploadLocal)('inbodies/');
exports.uploadTraineeLocal = (0, exports.uploadLocal)('trainees/');
exports.uploadInbodyS3 = (0, exports.uploadS3)(process.env.S3_BUCKET_NAME_INBODIES || '');
exports.uploadTraineeS3 = (0, exports.uploadS3)(process.env.S3_BUCKET_NAME_TRAINEES || '');
