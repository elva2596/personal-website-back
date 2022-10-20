const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PubSchema = new Schema({
  content_cn:String,
  content_en:String,
  coverUrl:String,
  tittle_en:String,
  tittle_cn:String,
  create_time_cn:String,
  create_time_en:String,
  order: Number
})

PubSchema.index({order: 1});
const PubModel = mongoose.model("Publication",PubSchema);
module.exports = PubModel
