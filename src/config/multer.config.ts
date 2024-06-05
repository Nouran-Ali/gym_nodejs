import multer from "multer";

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Specify the file name
  },
});

// Initialize multer instance with the storage configuration
export const upload = multer({ storage: storage });