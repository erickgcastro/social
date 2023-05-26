const multer = require('multer');
const path = require('node:path');

const uploadsFolder = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    return cb(null, uploadsFolder);
  },
  filename: (_, file, cb) => {
    const imageType = file.originalname.split('.').pop();
    const id = new Date().getTime().toString();
    const fileName = `${id}.${imageType}`;
    return cb(null, fileName);
  },
});

const multerMiddleware = multer({
  storage,
});

module.exports = { multerMiddleware };
