
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appErrors');

const uploads = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "-" + file.originalname);
        }
    });
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)

        } else {
            cb(new AppError('images only'))

        }


    }
    return multer({ storage, fileFilter });
}
const fileUploadsingle = (fieldName, folderName) => uploads(folderName).single(fieldName)
const fileUploadMix = (fieldName, folderName) => uploads(folderName).fields(fieldName)

module.exports = {
    fileUploadMix,
    fileUploadsingle
}