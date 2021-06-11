const multer = require('multer');

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, process.cwd()+'/../Frontend/public/uploads');
    },
    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
  
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    }
});

module.exports = upload;