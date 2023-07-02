const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
  title_cn: String,
  title_en: String,
  coverUrl: String,
  desc_cn: String,
  desc_en: String,
  content_cn: String,
  content_en: String,
  order: Number
})
const NewModel = mongoose.model('New', newSchema)
module.exports = NewModel
