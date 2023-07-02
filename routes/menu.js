const express = require('express')
const router = express.Router()
const menu = require('../controllers/menu')
router.get('/menu', menu.getMenu)
router.put('/menu', menu.updateMenu)
module.exports = router
