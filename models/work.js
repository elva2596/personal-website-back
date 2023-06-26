const mongoose = require('mongoose')
const Schema = mongoose.Schema
const workSchema = new Schema({
  title_cn: String,
  title_en: String,
  coverUrl: String,
  desc_cn: String,
  desc_en: String,
  content_cn: String,
  content_en: String,
  order: Number
})
workSchema.index({ order: 1 })
const WorkModel = mongoose.model('Work', workSchema)
module.exports = WorkModel
