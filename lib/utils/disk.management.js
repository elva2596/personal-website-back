var utils = require('./utils.js');
var Busboy = require('busboy');
var merge = require('merge');
var path = require('path');
var fs = require('fs');
var sha1 = require('sha1');
var gm = require('gm').subClass({imageMagick: true});
var qiniu = require('qiniu')

/**
 * Upload a file to the specified location.
 *
 * @param req request stream
 * @param fileRoute string
 * @param options [optional]
 *   {
*     fieldname: string
*     validation: array OR function(filePath, mimetype, callback)
*     resize: array [only for images]
*   }
 * @param callback returns {link: 'linkPath'} or error string
 */
function uploadQn(req, fileRoute, options, callback) {
  if (!options.accessKey || ! options.secretKey){
    return callback('AK OR SK not defined');
  }
  if (!options.bucket){
    return callback('bucket not defined');
  }
  if (!options.domain){
    return callback('URL domain not defined');
  }
  options.zone = options.zone || 'Zone_z0';

  var saveToPath = null;
  var errorMessage = null;

  // Used for sending response.
  var link = null;

  function handleStreamError(error) {

    console.log("error:", error)
    // Do not enter twice in here.
    if (errorMessage) {
      return;
    }
    errorMessage = error;

    // Cleanup.
    if (saveToPath) {
      return fs.unlink(saveToPath, function (err) {
        return callback(errorMessage);
      });
    }

    return callback(errorMessage);
  }

  try {
    var busboy = new Busboy({ headers: req.headers });
  } catch(e) {
    return callback(e);
  }

  // 删除本地文件，上传至七牛云
  function uploadToQiniu(options) {
    // 鉴权对象
    var mac = new qiniu.auth.digest.Mac(options.accessKey, options.secretKey);
    // 上传凭证
    var uploadOption = {
      scope: options.bucket
    };
    var putPolicy = new qiniu.rs.PutPolicy(uploadOption);
    var uploadToken=putPolicy.uploadToken(mac);

    // 构建配置类（指定机房）
    var qnConfig = new qiniu.conf.Config();
    qnConfig.zone = qiniu.zone[options.zone];

    // 准备上传
    var formUploader = new qiniu.form_up.FormUploader(qnConfig);
    var putExtra = new qiniu.form_up.PutExtra();

    var rs = fs.createReadStream(saveToPath);
    formUploader.putStream(uploadToken, randomName, rs, putExtra, function(respErr, respBody, respInfo) {
      // Cleanup.
      if (saveToPath) {
        fs.unlink(saveToPath, function (err) {});
      }

      if (respErr) {
        return handleStreamError('Qiniu upload error: ' + respErr.toString());
      }
      if (respInfo.statusCode === 200) {
        sendResponse(options.domain + '/' + respBody.key)
      } else {
        return handleStreamError('Qiniu upload error: ' + respBody.error);
      }
    });
  }

  function sendResponse(qiniuKey) {
    if(qiniuKey){
      callback(null, {link: qiniuKey});
    }else {
      callback(null, {link: link});
    }
  }

  // Handle file arrival.
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

    // Check fieldname:
    if (fieldname !== options.fieldname) {

      // Stop receiving from this stream.
      file.resume();
      return callback('Fieldname is not correct. It must be: ' + options.fieldname);
    }

    // Generate link.
    randomName = sha1(new Date().getTime()) + '.' + utils.getExtension(filename);
    link = fileRoute + randomName;

    var appDir = path.dirname(require.main.filename);
    // Generate path where the file will be saved.
    saveToPath = path.join(appDir, link);

    // Pipe reader stream (file from client) into writer stream (file from disk).
    file.on('error', handleStreamError);

    var diskWriterStream = fs.createWriteStream(saveToPath);
    diskWriterStream.on('error', handleStreamError);
    diskWriterStream.on('finish', function() {

      // Validate uploaded file.
      if (options.validation) {

        return utils.isValid(options.validation, saveToPath, mimetype, function(err, status) {

          if (err) {
            return handleStreamError(err);
          }

          if (!status) {
            return handleStreamError('File does not meet the validation.');
          }

          return uploadToQiniu(options)
        });
      }
      return uploadToQiniu(options)
    })

    if (options.resize && mimetype != 'image/svg+xml') {

      var gmFile = gm(file);
      var imageResizeStream = gmFile.resize.apply(gmFile, options.resize).stream();
      imageResizeStream.on('error', handleStreamError);

      imageResizeStream.pipe(diskWriterStream);
    } else {
      file.pipe(diskWriterStream);
    }
  });

  // Handle file upload termination.
  busboy.on('error', handleStreamError);
  req.on('error', handleStreamError);

  // Pipe reader stream into writer stream.
  return req.pipe(busboy);
}



/**
 * Upload a file to the specified location.
 *
 * @param req request stream
 * @param fileRoute string
 * @param options [optional]
 *   {
*     fieldname: string
*     validation: array OR function(filePath, mimetype, callback)
*     resize: array [only for images]
*   }
 * @param callback returns {link: 'linkPath'} or error string
 */
function upload(req, fileRoute, options, callback) {

  var saveToPath = null;
  var errorMessage = null;

  // Used for sending response.
  var link = null;

  function handleStreamError(error) {

    // Do not enter twice in here.
    if (errorMessage) {
      return;
    }
    errorMessage = error;

    // Cleanup.
    if (saveToPath) {
      return fs.unlink(saveToPath, function (err) {
        return callback(errorMessage);
      });
    }

    return callback(errorMessage);
  }

  try {
    var busboy = new Busboy({ headers: req.headers });
  } catch(e) {
    return callback(e);
  }

  function sendResponse() {
    callback(null, {link: link});
  }

  // Handle file arrival.
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

    // Check fieldname:
    if (fieldname != options.fieldname) {

      // Stop receiving from this stream.
      file.resume();
      return callback('Fieldname is not correct. It must be: ' + options.fieldname);
    }

    // Generate link.
    var randomName = sha1(new Date().getTime()) + '.' + utils.getExtension(filename);
    link = fileRoute + randomName;

    var appDir = path.dirname(require.main.filename);
    // Generate path where the file will be saved.
    saveToPath = path.join(appDir, link);

    // Pipe reader stream (file from client) into writer stream (file from disk).
    file.on('error', handleStreamError);

    var diskWriterStream = fs.createWriteStream(saveToPath);
    diskWriterStream.on('error', handleStreamError);
    diskWriterStream.on('finish', function() {

      // Validate uploaded file.
      if (options.validation) {

        return utils.isValid(options.validation, saveToPath, mimetype, function(err, status) {

          if (err) {
            return handleStreamError(err);
          }

          if (!status) {
            return handleStreamError('File does not meet the validation.');
          }

          return sendResponse();
        });
      }
      return sendResponse();
    })

    if (options.resize && mimetype != 'image/svg+xml') {

      var gmFile = gm(file);
      var imageResizeStream = gmFile.resize.apply(gmFile, options.resize).stream();
      imageResizeStream.on('error', handleStreamError);

      imageResizeStream.pipe(diskWriterStream);
    } else {
      file.pipe(diskWriterStream);
    }
  });

  // Handle file upload termination.
  busboy.on('error', handleStreamError);
  req.on('error', handleStreamError);

  // Pipe reader stream into writer stream.
  return req.pipe(busboy);
}

/**
* Delete file from disk.
*
* @param src string path to file
* @param callback returns null/undefined or error string
*/
var _delete = function(src, callback) {

  fs.unlink(path.join(path.dirname(require.main.filename), src), function (err) {
    if (err) {
      return callback(err);
    }
    return callback();
  });
}


// Exporting:

exports['delete'] = _delete;
exports.upload = upload;
exports.uploadQn = uploadQn;
