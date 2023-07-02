const express = require('express')
const router = express.Router()
const video = require('../controllers/home')
router.get('/video', video.getHome)
router.put('/video', video.updateHome)
module.exports = router
