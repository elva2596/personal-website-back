const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workSchema = new Schema({
    title_cn:String,
    title_en:String,
    coverUrl:String,
    works:[
      {
        // name_cn:String,
        // name_en:String,
        desc_cn:String,
        desc_en:String,
        // size:String,
        imageUrl:String,
        // width:String,
        // length:String,
        // height:String,
        count:String
      }
    ],
    order: Number
})
workSchema.index({order: 1});
const WorkModel = mongoose.model("Work",workSchema);
module.exports = WorkModel
