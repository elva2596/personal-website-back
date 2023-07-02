const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PubSchema = new Schema({
  title_cn: String,
  title_en: String,
  coverUrl: String,
  desc_cn: String,
  desc_en: String,
  content_cn: String,
  content_en: String,
  order: Number
})

PubSchema.index({ order: 1 })
const PubModel = mongoose.model('Publication', PubSchema)
module.exports = PubModel
