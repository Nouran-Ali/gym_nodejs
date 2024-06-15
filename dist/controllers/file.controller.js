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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const stream_1 = require("stream");
const mime_types_1 = __importDefault(require("mime-types")); // Import mime-types for extension mapping
// Configure AWS SDK with your credentials
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
class FileController {
    getFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract filename and bucket from request params
                const { filename, bucket } = req.query;
                if (!filename || !bucket) {
                    res.status(400).json({ message: 'Filename and bucket are required' });
                    return;
                }
                const params = {
                    Bucket: bucket,
                    Key: filename,
                };
                // Get the file from S3
                const command = new client_s3_1.GetObjectCommand(params);
                const data = yield s3Client.send(command);
                // Ensure the Body is a Readable stream
                if (!data.Body || !(data.Body instanceof stream_1.Readable)) {
                    throw new Error('Unexpected body type from S3');
                }
                // Determine MIME type and extension based on file name
                const contentType = data.ContentType || 'application/octet-stream';
                const fileExtension = mime_types_1.default.extension(contentType) || 'dat'; // Default to 'dat' if extension not found
                // Set the appropriate content type
                res.setHeader('Content-Type', contentType);
                // Set Content-Disposition header to specify filename with extension
                const disposition = `attachment; filename="${filename}.${fileExtension}"`;
                res.setHeader('Content-Disposition', disposition);
                // Pipe the file stream to the response
                data.Body.pipe(res);
            }
            catch (error) {
                // Handle errors
                next(error);
            }
        });
    }
}
exports.default = new FileController();
