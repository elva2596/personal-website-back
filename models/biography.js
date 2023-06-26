const mongoose = require('mongoose')
const Schema = mongoose.Schema
// {
//   content_cn:"sssss",
//   content_en:""
// }
const bioShchema = new Schema({
  content_cn: String,
  content_en: String
})
const BioModel = mongoose.model('Biography', bioShchema)
module.exports = BioModel
