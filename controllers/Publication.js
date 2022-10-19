const PubModel = require('../models/publication');
const createPub = (req,res)=>{
  console.log(req.body)
  const instancePub = new PubModel(req.body)
  instancePub.save()
              .then(pub=>{
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
const getPublications = (req,res)=>{
  PubModel.find({}).sort({"_id": -1})
            .exec()
            .then(works=>{
              res.send({
                status:1,
                msg:"success",
                data:works
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
const deletePublication = (req,res)=>{
    console.log(req.query.id)
  PubModel.remove({_id:req.query.id})
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
const findPubById = (req,res)=>{
  PubModel.findById(req.params.id)
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
const updatePub = (req,res)=>{
  PubModel.update({_id:req.body._id},req.body)
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
  createPub,
  getPublications,
  deletePublication,
  updatePub,
  findPubById
}
