const multer = require('multer');

const uploadImg = multer({
    storage : multer.memoryStorage(),//almacena el file en memoria para luego procesarla
    limits : {
        fileSize: 3000000,
        file: 1
    },
    fileFilter: (req, file, callback) => {//registre los formatos permitidos
        if (!file.originalname.match(/\.(png|jpeg|jpg|webp)$/)) {
          return callback(new Error('Por favor subir una foto en formato PNG, JPEG ó JPG'));
        }
        callback(null, true);
    }
})

module.exports = uploadImg;