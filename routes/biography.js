const express = require('express')
const router = express.Router()
const biography = require('../controllers/biography')
const verifyToken = require('../middlewares/index')
router.get('/biography', biography.getBio)
router.post('/biography', verifyToken, biography.createBio)
router.put('/biography', verifyToken, biography.updateBio)
module.exports = router
