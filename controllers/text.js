const TextModel = require('../models/text');
const getLastDocSeq = async () => {
  const doc = await TextModel.findOne().sort({"order": -1}).limit(1).exec() || {};
  return doc.order || 0;
}

// reset order everyday
const resetTextsOrder = async () => {
  const docs = await TextModel.find().sort({"order": 1}).exec();
  const updates = docs.map((doc, index) => ({
    updateOne: { 
      "filter": { "_id": doc._id }, 
      "update": { "$set": { order: (index + 1) * 1024 }  }   
    }
  }))
  await TextModel.bulkWrite(updates);
}

const findPreCard = async (id) => {
  const res = await TextModel.findById(id).exec();
  console.log('res--:', id, res.order)
  return res.order;
}

const sortTextsOrder = async (req, res) => {
  try {
  const { preId, nextId, curId } = req.body;
  console.log('order:', preId, nextId, curId);
  let preOrder, curOrder, nextOrder;
  if(!preId) {
    nextOrder = await findPreCard(nextId);
    curOrder = nextOrder + 512;
  } else if(!nextId) {
    preOrder = await findPreCard(preId);
    curOrder = preOrder - 512;
  } else {
    const res = await Promise.all([findPreCard(preId), findPreCard(nextId)]).catch(err => {
      console.log('find error:', err)
    });
    
    preOrder = res[0];
    nextOrder = res[1];
    curOrder = Math.floor((preOrder + nextOrder) / 2);
  }

  

    console.log('order val:', curOrder, preOrder, nextOrder)
    await TextModel.findOneAndUpdate({_id:curId }, {$set: { order: curOrder }});
   
    if(Math.abs(curOrder - preOrder) <= 1 || Math.abs(curOrder - nextOrder) <= 1) {
      await resetTextsOrder();
    }
    res.send({
      status:1,
      msg:"success"
    })
  } catch (error) {
    console.log('sortTextsOrder error:', error)
    res.send({
      status:-1,
      msg:"err",
      data:error.message.toString()
    })
  }
}

const createText = async (req,res)=>{
  const workInfo = req.body
  const instanceWork = new TextModel(workInfo);
  const nextSeq = await getLastDocSeq() + 1024;
  instanceWork.order = nextSeq;
  try {
    await instanceWork.save();
    res.send({
      status:1,
      msg:"success",
      data:''
    })
  } catch (error) {
    res.send({
      status:-1,
      msg:"err",
      data:error.message.toString()
    })
  }
}
const findTextById = (req,res)=>{
  TextModel.findById(req.params.id)
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
const getTexts = (req,res)=>{
  TextModel.find({},{content_cn:0,content_en:0}).sort({"order": -1})
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
const deleteText = (req,res)=>{
  TextModel.remove({_id:req.query.id})
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
const updateText = (req,res)=>{
  TextModel.update({_id:req.body._id},req.body)
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
  createText,
  findTextById,
  getTexts,
  deleteText,
  updateText,
  sortTextsOrder,
  resetTextsOrder
}
