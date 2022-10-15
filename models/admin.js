// Schema和Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name:{
    type:String,
    index:true,//设置name字段为索引
    unique:true//存到数据库中的name的值必须是唯一的
  },
  password:String,
  create_time:String//not Date
  /**
   * 这里如果设置成Date类型的话，那么是UTC时间，而非东八区
   * so，设置成时间戳字符串存到数据库，然后在前台转成格式化时间字符串
   */
})
// 创建Model(即集合)
const Admin = mongoose.model("Admin",userSchema);//第一个参数是集合的名字(数据库自自动在后面加一个s)
module.exports = Admin
