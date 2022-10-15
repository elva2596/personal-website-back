
// 想要登出必须先登录
module.exports = (req,res)=>{
  res.send({
    status:1,
    msg:"success",
    data:"删除成功"
  })
}
