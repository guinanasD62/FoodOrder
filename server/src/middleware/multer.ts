// middleware/multer.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set the uploads directory relative to the server root
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
// const checkFileType = (file, cb) => {
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images Only! Allowed formats are JPEG, JPG, PNG, and GIF.'));
    }
};

// Initialize upload
export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: File size limit (e.g., 5 MB)
});
