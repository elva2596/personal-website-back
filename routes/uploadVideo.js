const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/index')
const uploadVideo = require('../controllers/uploadVideo')
router.post('/upload_video', verifyToken, uploadVideo)
module.exports = router
