const qiniu  = require('qiniu');
const path = require("path")
const fs = require('fs');
const config = new qiniu.conf.Config();
// config.zone = qiniu.zone.Zone_z0;
// 北美测试使用
config.zone = qiniu.zone.Zone_na0;

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();
const bucketHost = process.env.BUCKET_HOST
// 创建token
const createToken = ()=>{
  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY,process.env.SECRET_KEY)
  // console.log('mac:', mac)
  const ops = {scope:process.env.BUCKET}
  return  new qiniu.rs.PutPolicy(ops).uploadToken(mac)
}

const upload = (baseDir,filePath,fileName)=>{
  const token = createToken()
  // 以当前时间戳+0-10000的任意整数的16进制字符串为上传的图片重命名
  const imgName = (Date.now()+Math.ceil(Math.random()*10000)).toString(16)
  // 返回指定文件的扩展名
  const extName = path.extname(fileName)
  const newFileName = imgName+extName
  const repath = `${baseDir}/${newFileName}`
  // 封装成promise
  return new Promise((resolve,rejected)=>{
    fs.rename(filePath,repath,function (){
      formUploader.putFile(token, newFileName, repath, putExtra, function(err, ret) {
            if(!err) {
              // url存到数据库中
              const imgUrl = `${bucketHost}/${ret.key}`
              // console.log('imgUrl error:', repath)
              fs.unlink(repath, function(){

              })
              // TODO: 这里要分成几种图片啊。
              resolve(imgUrl)
            } else {
            rejected(err)
            }
          });
    })
  })
}
module.exports = upload
