const mongoose = require('mongoose')
const Schema = mongoose.Schema
const exhSchema = new Schema({
  title_cn: String,
  title_en: String,
  coverUrl: String,
  desc_cn: String,
  desc_en: String,
  content_cn: String,
  content_en: String,
  order: Number
})

exhSchema.index({ order: 1 })
const ExhModel = mongoose.model('Exhibition', exhSchema)
module.exports = ExhModel
