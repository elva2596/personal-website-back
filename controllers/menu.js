const MenuModel = require('../models/menu')
const getMenu = async (req, res) => {
  try {
    const result = await MenuModel.findOneAndUpdate(
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

const updateMenu = async (req, res) => {
  console.log('req:', req.body)
  try {
    const result = await MenuModel.findOneAndUpdate({}, { $set: { routes: req.body } }, { new: true })
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
  getMenu,
  updateMenu
}
