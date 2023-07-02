const PubModel = require('../models/publication')
const getLastDocSeq = async () => {
  const doc = (await PubModel.findOne().sort({ order: -1 }).limit(1).exec()) || {}
  return doc.order || 0
}

// reset order everyDay
const resetPubOrder = async () => {
  const docs = await PubModel.find().sort({ order: 1 }).exec()
  const updates = docs.map((doc, index) => ({
    updateOne: {
      filter: { _id: doc._id },
      update: { $set: { order: (index + 1) * 1024 } }
    }
  }))
  await PubModel.bulkWrite(updates)
}

const findPreCard = async (id) => {
  const res = await PubModel.findById(id).exec()
  console.log('res--:', id, res.order)
  return res.order
}

const sortPubOrder = async (req, res) => {
  try {
    const { preId, nextId, curId } = req.body
    console.log('order:', preId, nextId, curId)
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

    console.log('order val:', curOrder, preOrder, nextOrder)
    await PubModel.findOneAndUpdate({ _id: curId }, { $set: { order: curOrder } })

    if (Math.abs(curOrder - preOrder) <= 1 || Math.abs(curOrder - nextOrder) <= 1) {
      await resetPubOrder()
    }
    res.send({
      status: 1,
      msg: 'success'
    })
  } catch (error) {
    console.log('sortPubOrder error:', error)
    res.send({
      status: -1,
      msg: 'err',
      data: error.message.toString()
    })
  }
}

const createPub = async (req, res) => {
  const workInfo = req.body
  const instanceWork = new PubModel(workInfo)
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
const getPublications = async (req, res) => {
  const { pageSize, pageNum, meta } = req.query
  try {
    const count = await PubModel.count()
    const limitQuery = {}
    if (meta) {
      JSON.parse(meta).forEach((key) => (limitQuery[key] = 1))
    }
    console.log('limitQuery:', JSON.parse(meta), limitQuery)
    const query = PubModel.find({}, limitQuery).sort({ order: -1 })
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
const deletePublication = async (req, res) => {
  try {
    await PubModel.deleteOne({ _id: req.params.id })
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
const findPubById = async (req, res) => {
  try {
    const result = await PubModel.findById(req.params.id).exec()
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
const updatePub = async (req, res) => {
  try {
    await PubModel.updateOne(
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
  createPub,
  getPublications,
  deletePublication,
  updatePub,
  findPubById,
  sortPubOrder,
  resetPubOrder
}
