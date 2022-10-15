const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// {
//   content_cn:"sssss",
//   content_en:""
// }
const contactShchema = new Schema({
    content_cn:String,
    content_en:String
})
const ContactModel = mongoose.model("Contact",contactShchema)
module.exports = ContactModel
