const bcrypt = require("bcrypt");
const AdminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const login = (req,res)=>{
  let {name,password} = req.body;
  AdminModel.findOne({name})
            .exec()
            .then(user=>{
              if(user){
                let {password:hash,_id} = user;
                bcrypt.compare(password,hash)
                      .then((result)=>{
                        if(result){
                            // 创建token
                            let token = jwt.sign({
                              name,
                              _id,
                              exp:Math.floor(Date.now()/1000)+7*24*60*60
                            },process.env.JWT_SECRET)
                            res.send({
                                status:1,
                                msg:"ok",
                                data:"登录成功",
                                token
                            })
                        }else{
                            res.send({
                                status:0,
                                msg:"err",
                                data:"用户名或密码错误"
                            })
                        }
                      })
              }else{
                res.send({status:0,msg:"ok",data:"用户名或密码错误"})
              }
            })
            .catch((err)=>{
              res.send({
                  status:-1,
                  msg:"server error",
                  data:err.message.toString()
              })
            })
};
module.exports = login;
