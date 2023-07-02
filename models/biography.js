const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bioShchema = new Schema({
  content_cn: String,
  content_en: String
})
const BioModel = mongoose.model('Biography', bioShchema)
module.exports = BioModel
