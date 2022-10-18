const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// {
//   title_cn:"",
//   title_en:"",
//   place_cn:"",
//   place_en:"",
//   create_time:"",
//   coverUrl:"",
//   desc_cn:"",
//   desc_en:"",
// }
//
// exhInfo:{
//   tittle_cn:"",
//   tittle_en:"",
//   place_cn:"",
//   place_en:"",
//   create_time_cn:"",
//   create_time_en:"",
//   coverUrl:"",
//   desc_cn:"",
//   desc_en:"",
//   exhs:[
//     {
//       imageUrl:'',
//       count:"一"
//     },
//   ]
// }
const exhSchema = new Schema({
  tittle_cn:String,
  tittle_en:String,
  place_cn:String,
  place_en:String,
  coverUrl:String,
  create_time_cn:String,
  create_time_en:String,
  desc_cn:String,
  desc_en:String,
  exhs:[
    {
      imageUrl:String,
      count:String
    },
  ],
  order: Number
})

exhSchema.index({order: 1});
const ExhModel = mongoose.model("Exhibition",exhSchema);
module.exports = ExhModel
