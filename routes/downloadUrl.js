const express = require('express')
const router = express.Router()
const getDownloadUrl = require('../controllers/getDownloadUrl')
router.get('/downloadUrl', getDownloadUrl)
module.exports = router
