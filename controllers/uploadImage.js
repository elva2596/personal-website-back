const FroalaEditor = require('../lib/froalaEditor');
const uploadOps = require("../utils/options");
// 北美测试使用
// config.zone = qiniu.zone.Zone_na0;
const uploadImage = (req, res)=>{

  FroalaEditor.Image.uploadQn(req, '/uploads/', uploadOps, function(err, data) {
 
    if (err) {
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
}

module.exports = uploadImage;