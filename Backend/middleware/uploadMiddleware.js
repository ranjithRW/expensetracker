const multer = require('multer');

//configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//filter file
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg, png, jpg ,webp files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 }, //5MB limit
});
module.exports = upload;