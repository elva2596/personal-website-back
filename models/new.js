const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//   title_cn:"",
//   title_en:"",
//   place_cn:"",
//   place_en:"",
//   coverUrl:"",
//   content_cn:"",
//   content_en:""
// }
const newSchema = new Schema({
    content_cn:String,
    content_en:String,
    tittle_cn:String,
    tittle_en:String
})
const NewModel = mongoose.model("New",newSchema);
module.exports = NewModel
