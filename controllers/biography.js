const BioModel = require('../models/biography')
const createBio = async (req, res) => {
  try {
    const instanceBio = new BioModel(req.body)
    await instanceBio.save()
    res.send({
      status: 1,
      msg: 'success',
      data: ''
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const getBio = async (req, res) => {
  try {
    const result = await BioModel.findOne({}).exec()
    res.send({
      status: 1,
      msg: 'success',
      data: result
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const updateBio = async (req, res) => {
  try {
    await BioModel.updateOne({}, { $set: req.body }).exec()
    res.send({
      status: 1,
      msg: 'success',
      data: ''
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
module.exports = {
  createBio,
  getBio,
  updateBio
}
