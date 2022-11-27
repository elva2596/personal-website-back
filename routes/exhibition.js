const express = require('express');
const router = express.Router();
const exhibition = require('../controllers/exhibition');
const verifyToken = require("../middlewares/index");
router.post("/exhibition",verifyToken, exhibition.createExhibition)
router.get("/exhibitions",exhibition.getExhitions)
router.delete("/exhibition",verifyToken, exhibition.deleteExhibition)
router.get("/exhibition/:id", exhibition.findExhById)
router.put("/exhibition",verifyToken, exhibition.updateExh)
router.put("/sortexh", verifyToken, exhibition.sortWork);
module.exports = router
