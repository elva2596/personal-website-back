const BioModel = require('../models/biography');
const createBio = (req,res)=>{
  const instanceBio = new BioModel(req.body)
  instanceBio.save()
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
const getBio = (req,res)=>{
  BioModel.find({})
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
const updateBio = (req,res)=>{
  BioModel.update({_id:req.body._id},req.body)
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
  createBio,
  getBio,
  updateBio
}
