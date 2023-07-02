const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/index')
const uploadImage = require('../controllers/uploadImage')
router.post('/upload_image', verifyToken, uploadImage)
module.exports = router
