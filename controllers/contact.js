const ContactModel = require('../models/contact');
const createContact = (req,res)=>{
  const instanceContact = new ContactModel(req.body)
  instanceContact.save()
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
const getContact = (req,res)=>{
  ContactModel.find({})
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
const updateContact = (req,res)=>{
  ContactModel.update({_id:req.body._id},req.body)
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
  createContact,
  getContact,
  updateContact
}
