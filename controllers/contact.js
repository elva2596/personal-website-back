const ContactModel = require('../models/contact')
const createContact = async (req, res) => {
  const instanceContact = new ContactModel(req.body)
  try {
    await instanceContact.save()
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
const getContact = async (req, res) => {
  try {
    const result = await ContactModel.findOne({}).exec()
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
const updateContact = async (req, res) => {
  try {
    await ContactModel.updateOne({}, { $set: req.body }).exec()
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
  createContact,
  getContact,
  updateContact
}
