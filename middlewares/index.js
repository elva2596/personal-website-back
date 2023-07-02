const jwt = require('jsonwebtoken')
const AdminModel = require('../models/admin')
module.exports = (req, res, next) => {
  console.log('headers:', req.headers['authorization'])
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1]
    // console.log(` req.headers["authorization"]:`,  req.headers["authorization"])
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        res.send({ status: 401, msg: err.name, data: 'Unauthorization' })
      } else {
        const { errors } = await AdminModel.findOne({ _id: decoded._id }).exec()
        if (errors) {
          res.send({ status: 401, msg: err.name, data: 'Unauthorization' })
        } else {
          next()
        }
      }
    })
  }
}
