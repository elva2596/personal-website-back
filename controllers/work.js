const WorkModel = require('../models/work')

const getLastDocSeq = async () => {
  const doc = (await WorkModel.findOne().sort({ order: -1 }).limit(1).exec()) || {}
  return doc.order || 0
}

// reset order everyDay
const resetOrder = async () => {
  const docs = await WorkModel.find().sort({ order: 1 }).exec()
  const updates = docs.map((doc, index) => ({
    updateOne: {
      filter: { _id: doc._id },
      update: { $set: { order: (index + 1) * 1024 } }
    }
  }))
  await WorkModel.bulkWrite(updates)
}

const findPreCard = async (id) => {
  const res = await WorkModel.findById(id).exec()
  console.log('res--:', id, res.order)
  return res.order
}
const sortWork = async (req, res) => {
  const { preId, nextId, curId } = req.body
  console.log('order:', req.body, preId, nextId, curId)
  let preOrder, curOrder, nextOrder
  if (!preId) {
    nextOrder = await findPreCard(nextId)
    curOrder = nextOrder + 512
  } else if (!nextId) {
    preOrder = await findPreCard(preId)
    curOrder = preOrder - 512
  } else {
    const res = await Promise.all([findPreCard(preId), findPreCard(nextId)]).catch((err) => {
      console.log('find error:', err)
    })
    preOrder = res[0]
    nextOrder = res[1]
    curOrder = Math.floor((preOrder + nextOrder) / 2)
  }

  try {
    console.log('order val:', curOrder, preOrder, nextOrder)
    await WorkModel.findOneAndUpdate({ _id: curId }, { $set: { order: curOrder } })

    if (Math.abs(curOrder - preOrder) <= 1 || Math.abs(curOrder - nextOrder) <= 1) {
      await resetOrder()
    }
    res.send({
      status: 1,
      msg: 'success'
    })
  } catch (error) {
    console.log('sortWork error:', error)
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const createWork = async (req, res) => {
  const workInfo = req.body
  const instanceWork = new WorkModel(workInfo)
  const nextSeq = (await getLastDocSeq()) + 1024
  instanceWork.order = nextSeq
  try {
    await instanceWork.save()
    res.send({
      status: 1,
      msg: 'success',
      data: ''
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const getWorks = async (req, res) => {
  const { pageSize, pageNum, meta } = req.query
  try {
    const count = await WorkModel.count()
    const limitQuery = {}
    if (meta) {
      JSON.parse(meta).forEach((key) => (limitQuery[key] = 1))
    }
    console.log('limitQuery:', JSON.parse(meta), limitQuery)
    const query = WorkModel.find({}, limitQuery).sort({ order: -1 })
    if (pageSize && pageNum) {
      await query.skip((Number(pageNum) - 1) * pageSize).limit(Number(pageSize))
    }
    const works = await query.exec()
    res.send({
      status: 1,
      msg: 'success',
      data: works,
      total: count
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}

const deleteWork = async (req, res) => {
  try {
    await WorkModel.deleteOne({ _id: req.params.id })
    res.send({
      status: 1,
      msg: 'success'
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const deleleAllWorks = async (req, res) => {
  try {
    await WorkModel.deleteMany({ _id: { $in: req.body } })
    res.send({
      status: 1,
      msg: 'success',
      data: []
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const findWorksById = async (req, res) => {
  try {
    const result = await WorkModel.findById(req.params.id).exec()
    res.send({
      status: 1,
      msg: 'success',
      data: result
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
const updateWork = async (req, res) => {
  try {
    await WorkModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    ).exec()
    res.send({
      status: 1,
      msg: 'success',
      data: { id: req.params.id }
    })
  } catch (error) {
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}
module.exports = {
  createWork,
  getWorks,
  deleteWork,
  findWorksById,
  updateWork,
  resetOrder,
  sortWork,
  deleleAllWorks
}
