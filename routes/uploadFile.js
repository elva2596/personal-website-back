const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/index')

const uploadFile = require('../controllers/uploadFile')
router.post('/upload_file', verifyToken, uploadFile)
module.exports = router
