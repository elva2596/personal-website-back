const AdminModel = require("../models/admin");
const getUserByName = (req,res)=>{
  console.log(req.query)
  let {name} = req.query
  AdminModel.findOne({name})
            .exec()
            .then(user=>{
              if(user){
                res.send({
                  status:0,
                  msg:"err",
                  data:"用户名已存在"
                })
              }else{
                res.send({
                  status:1,
                  msg:"success",
                  data:"用户名可以使用"
                })
              }
            })
            .catch((err) => {
              res.send({
                status:-1,
                msg:"err",
                data:err.message.toString()
              })})
}
module.exports = getUserByName
