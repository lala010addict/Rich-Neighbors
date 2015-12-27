'use strict';

var express = require('express');
var controller = require('./image.controller');
var multer = require('multer');
var AWS = require('aws-sdk');
var s3 = require('multer-s3')
var config = require('../../config/environment')
var auth = require('../../auth/auth.service');
var router = express.Router({mergeParams: true});

var accessKeyId = config.amazon.accessKeyId;
var secretAccessKey = config.amazon.accessSecretKey;

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

// var s3 = new AWS.S3();

var upload = multer({
  storage: s3({
    dirname: 'uploads/photos',
    bucket: 'Campaigns',
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: 'us-east-1',
    filename: function (req, file, cb) {
      cb(null, Date.now())
    }
  })
});

router.param('id', controller.showParam)

// router.use(multer({ // https://github.com/expressjs/multer
//   dest: './public/uploads/',
//   limits : { fileSize:100000 },
//   rename: function (fieldname, filename) {
//     return filename.replace(/\W+/g, '-').toLowerCase();
//   },
//   onFileUploadData: function (file, data, req, res) {
//     // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//     var params = {
//       Bucket: 'makersquest',
//       Key: file.name,
//       Body: data
//     };

//     s3.putObject(params, function (perr, pres) {
//       if (perr) {
//         console.log("Error uploading data: ", perr);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// }));


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), upload.single('file'), function (req, res, next) {
  res.send('Successfully uploaded!');
});
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
