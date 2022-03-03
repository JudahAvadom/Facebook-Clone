const Router = require('express').Router();
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');

Router.post('/profilepicture', (req,res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
})

module.exports = Router;