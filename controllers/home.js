const HomeModel = require('../models/home')
const getHome = async (req, res) => {
  console.log('req receive')
  try {
    const result = await HomeModel.findOneAndUpdate(
      {},
      {},
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    ).exec()
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

const updateHome = async (req, res) => {
  console.log('req:', req.body)
  try {
    const result = await HomeModel.updateOne({}, { $set: req.body }).exec()
    console.log('result:', result)
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
module.exports = {
  getHome,
  updateHome
}
