const express = require('express');
const router = express.Router();
const newInfo = require('../controllers/new');
const verifyToken = require("../middlewares/index");
router.post("/new",verifyToken, newInfo.createNew)
router.get("/news",newInfo.getNews)
router.get("/new/:id",newInfo.findNewById)
router.delete("/new",verifyToken, newInfo.deleteNew)
router.put("/new",verifyToken, newInfo.updateNew)
router.put("/sortnews", verifyToken, newInfo.sortNewsOrder);
module.exports = router
