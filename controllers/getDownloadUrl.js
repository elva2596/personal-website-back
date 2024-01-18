const qiniu = require('qiniu')
const getDownloadUrl = (req, res) => {
  const { key } = req.query
  // console.log('exec---')
  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY, process.env.SECRET_KEY)
  var config = new qiniu.conf.Config()
  var bucketManager = new qiniu.rs.BucketManager(mac, config)
  var deadline = parseInt(Date.now() / 1000) + 3600 // 1小时过期
  var privateDownloadUrl = bucketManager.privateDownloadUrl(process.env.BUCKET_HOST, key, deadline)

  res.send({
    status: 200,
    msg: 'success',
    data: privateDownloadUrl
  })
}

module.exports = getDownloadUrl
