const NewModel = require('../models/new');
const createNew = (req,res)=>{
  const instanceNew = new NewModel(req.body)
  instanceNew.save()
            .then(work=>{
              res.send({
                status:1,
                msg:"success",
                data:''
              })
            })
            .catch(err=>{
              res.send({
                status:-1,
                msg:"err",
                data:err.message.toString()
              })
            })
}
const getNews = (req,res)=>{
  NewModel.find({}).sort({"_id": -1})
          .then(news=>{
            res.send({
              status:1,
              msg:"success",
              data:news
            })
          })
          .catch(err=>{
            res.send({
              status:-1,
              msg:"err",
              data:err.message.toString()
            })
          })
}
const findNewById = (req,res)=>{
  console.log(req.params.id)
  NewModel.findById(req.params.id)
          .exec()
          .then(re=>{
            res.send({
              status:1,
              msg:"success",
              data:re
            })
          })
          .catch((err) => {
            res.send({
              status:-1,
              msg:"err",
              data:err.message.toString()
            })
          })
}
const deleteNew = (req,res)=>{
  NewModel.remove({_id:req.query.id})
            .then(re=>{
              res.send({
                status:1,
                msg:"success",
                data:''
              })
            })
            .catch(err=>{
              res.send({
                status:-1,
                msg:"err",
                data:err.message.toString()
              })
            })
}
const updateNew = (req,res)=>{
  NewModel.update({_id:req.body._id},req.body)
          .exec()
          .then(re=>{
            console.log(re)
            res.send({
              status:1,
              msg:"success",
              data:""
            })
          })
          .catch(err=>{
            res.send({
              status:-1,
              msg:"err",
              data:err.message.toString()
            })
          })
}
module.exports = {
  createNew,
  getNews,
  findNewById,
  deleteNew,
  updateNew
}
