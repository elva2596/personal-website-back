/**
 * [Register controller]
 * @type {[type]}
 */
const bcrypt = require("bcrypt");
const AdminModel = require("../models/admin")
const moment = require("moment");
const objectIdToStamp = require("objectid-to-timestamp")
const register = (req,res)=>{
  let {name,password} = req.body
  let findPromise = AdminModel.findOne({name}).exec();
  let bcryptPrimse = bcrypt.hash(password,10);
  Promise.all([findPromise,bcryptPrimse])
         .then(([user,hash])=>{
           if(user){
             res.send({status:0,msg:"ok",data:"用户已经存在"})
           }else{
             let userRegister = new AdminModel({name,password:hash});
             userRegister.create_time = objectIdToStamp(userRegister._id);//存一个时间戳到数据库
             userRegister.save().then(()=>{res.send({status:1,msg:"ok",data:"注册成功"})})
           }
         })
         .catch((err) => {
           res.send({status:-1,msg:"err",data:err.message.toString()})
         })
}
module.exports =  register
/**
 * 总结:
    1.then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
    2.如果传给Promise.all的promise实例没有指定catch方法，则会调用Promise.all的catch方法
    3.mongoose默认给每个Scheme分配一个_id
    4.用户名及密码的验证规则全部在前端验证
    5.密码用hash加密和查找用户名是否重负的操作是两个独立的异步操作，so用Promise.all()
    6.操作数据库成功有两种结果，一个是找到1，一个是没有找到0
    7.后端发生错误-1
 */
