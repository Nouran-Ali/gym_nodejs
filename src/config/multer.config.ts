// src/config/multer.config.ts

import multer from 'multer';
import fs from 'fs';

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // You can set different folders based on some criteria
    const uploadDir = 'uploads/inbodies/';

    // Ensure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Set the file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer instance with the storage configuration
export const upload = multer({ storage });
