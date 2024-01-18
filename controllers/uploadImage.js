const FroalaEditor = require('../lib/froalaEditor')
const uploadOps = require('../utils/options')
// 北美测试使用
// config.zone = qiniu.zone.Zone_na0;
const uploadImage = (req, res) => {
  console.log('upload image')
  FroalaEditor.Image.uploadQn(req, '/uploads/', uploadOps, function (err, data) {
    console.log('upload image res:', data)
    if (err) {
      console.log('err:', err)
      return res.send(JSON.stringify(err))
    }
    res.send(data)
  })
}

module.exports = uploadImage
