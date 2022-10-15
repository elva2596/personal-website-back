const ExhModel = require('../models/exhibition');
const createExhibition = (req,res)=>{
  const instanceExh = new ExhModel(req.body)
  instanceExh.save()
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
const getExhitions = (req,res)=>{
  ExhModel.find({})
            .sort({"_id": -1})
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
const deleteExhibition = (req,res)=>{
    console.log(req.query.id)
  ExhModel.remove({_id:req.query.id})
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
const findExhById = (req,res)=>{
  ExhModel.findById(req.params.id)
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
const updateExh = (req,res)=>{
  ExhModel.update({_id:req.body._id},req.body)
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
  createExhibition,
  getExhitions,
  deleteExhibition,
  findExhById,
  updateExh
}
