import multer from 'multer';
import fs from 'fs';

// Define storage for uploaded files
const storage = (uploadDir: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure the directory exists
      fs.mkdirSync(uploadDir, { recursive: true });

      cb(null, uploadDir); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      // Set the file name
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Initialize multer instance with a function to configure storage dynamically
export const upload = (uploadDir: string) =>
  multer({ storage: storage(`uploads/${uploadDir}`) });

export const uploadInbody = upload('inbodies/');
export const uploadTrainee = upload('trainees/');
