const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//   content_cn:"",
//   content_en:"",
//   coverUrl:"",
//   tittle_en:"",
//   tittle_cn:""
// }
const PubSchema = new Schema({
  content_cn:String,
  content_en:String,
  coverUrl:String,
  tittle_en:String,
  tittle_cn:String,
  create_time_cn:String,
  create_time_en:String
})
const PubModel = mongoose.model("Publication",PubSchema);
module.exports = PubModel
