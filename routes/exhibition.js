const express = require('express');
const router = express.Router();
const exhibition = require('../controllers/exhibition');
router.post("/exhibition",exhibition.createExhibition)
router.get("/exhibitions",exhibition.getExhitions)
router.delete("/exhibition",exhibition.deleteExhibition)
router.get("/exhibition/:id",exhibition.findExhById)
router.put("/exhibition",exhibition.updateExh)
module.exports = router
