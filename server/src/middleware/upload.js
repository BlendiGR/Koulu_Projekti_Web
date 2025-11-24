import multer from "multer";

/**
 * Multer upload middleware configuration
 * @type {Multer}
 */
export const upload = multer({
    dest: 'uploads/', // Destination folder for uploaded files
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            const error = new Error('Only image files are allowed.');
            error.status = 400;
            cb(error, false);
        }
    }
});