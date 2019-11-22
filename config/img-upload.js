const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please choose an image file (jpg, jpeg, or png)'));
    }
    cb(undefined, true);
  }
});

module.exports = upload;
