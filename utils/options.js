const qiniu = require('qiniu')
const uploadOps = {
  accessKey: process.env.ACCESS_KEY, // AK
  secretKey: process.env.SECRET_KEY, // SK
  bucket: process.env.BUCKET, // 存储空间名称
  zone: qiniu.zone.Zone_z2, // 机房位置 华东Zone_z0 华北Zone_z1 华南Zone_z2 北美Zone_na0
  domain: process.env.BUCKET_HOST, // 测试域名或cdn加速域名（末尾不加/）
  fieldname: process.env.FIELD_NAME
}

module.exports = uploadOps
