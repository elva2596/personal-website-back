const mongoose = require('mongoose')
const Schema = mongoose.Schema
const homwShchema = new Schema({
  pcurl: {
    type: String,
    default: ''
  },
  murl: {
    type: String,
    default: ''
  }
})
const HomeModel = mongoose.model('home', homwShchema)
module.exports = HomeModel
