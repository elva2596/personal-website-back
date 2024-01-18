const qiniu = require('qiniu')
const getToken = (req, res) => {
  // console.log('exec---')
  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY, process.env.SECRET_KEY)
  // console.log('mac:', mac)
  const ops = { scope: process.env.BUCKET }
  const token = new qiniu.rs.PutPolicy(ops).uploadToken(mac)
  console.log('token:', token)
  res.send({
    status: 200,
    msg: 'success',
    data: token
  })
}

module.exports = getToken
