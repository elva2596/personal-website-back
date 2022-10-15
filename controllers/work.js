const WorkModel = require('../models/work');

const getLastDocSeq = async () => {
  const doc = await WorkModel.findOne().sort({"order": -1}).limit(1).exec() || {};
  return doc.order || 0;
}

// reset order everyDay
const resetOrder = async () => {
  const docs = await WorkModel.find().sort({"order": 1}).exec();
  const updates = docs.map((doc, index) => ({
    updateOne: { 
      "filter": { "_id": doc._id }, 
      "update": { "$set": { order: (index + 1) * 1024 }  }   
    }
  }))
  await WorkModel.bulkWrite(updates);
}

const findPreCard = async (id) => {
  const res = await WorkModel.findById(id).exec();
  console.log('res--:', id, res.order)
  return res.order;
}
const sortWork = async (req, res) => {
  const { preId, nextId, curId } = req.body;
  console.log('order:', preId, nextId, curId);
  let preOrder, curOrder, nextOrder;
  if(!preId) {
    const nextOrder = await findPreCard(nextId);
    curOrder = nextOrder + 512;
  } else if(!nextId) {
    const preOrder = await findPreCard(preId);
    curOrder = preOrder - 512;
  } else {
    const res = await Promise.all([findPreCard(preId), findPreCard(nextId)]).catch(err => {
      console.log('find error:', err)
    });
    preOrder = res[0];
    nextOrder = res[1];
    curOrder = Math.floor((preOrder + nextOrder) / 2);
  }

  try {

    console.log('order val:', curOrder, preOrder, nextOrder)
    await WorkModel.findOneAndUpdate({_id:curId }, {$set: { order: curOrder }});
   
    if(Math.abs(curOrder - preOrder) <= 1 || Math.abs(curOrder - nextOrder) <= 1) {
      await resetOrder();
    }
    res.send({
      status:1,
      msg:"success"
    })
  } catch (error) {
    console.log('sortWork error:', error)
    res.send({
      status:-1,
      msg:"err",
      data:error.message.toString()
    })
  }
}
const createWork = async (req,res)=>{
  const workInfo = req.body
  const instanceWork = new WorkModel(workInfo);
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
const getWorks = async (req,res) => {
  
  const {pageSize, pageNum} = req.query;
  // console.log('req:', req.query)
  try {
    const count = await WorkModel.count();
    const query = WorkModel.find({}, {works: 0}).sort({"order": -1});
    let hasMore = false;
    if(pageSize && pageNum) {
      await query.limit(Number(pageSize)).skip((Number(pageNum) - 1) * pageSize);
      console.log('hasMore:',count, Math.ceil(count / pageSize),  pageNum)
      hasMore = Math.ceil(count / pageSize) > pageNum;
    }
   const works = await query.exec();
   res.send({
      status:1,
      msg:"success",
      data: works,
      hasMore
    })
  } catch (error) {
    res.send({
      status:-1,
      msg:"err",
      data:err.message.toString()
    })
  }
}

const deleteWork = (req,res)=>{

  WorkModel.remove({_id:req.query.id})
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
const findWorksById = (req,res)=>{
  WorkModel.findById(req.params.id)
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
const updateWork = (req,res)=>{
  WorkModel.update({_id:req.body._id},req.body)
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
  createWork,
  getWorks,
  deleteWork,
  findWorksById,
  updateWork,
  resetOrder,
  sortWork
}
