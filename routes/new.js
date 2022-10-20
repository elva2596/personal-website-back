const express = require('express');
const router = express.Router();
const newInfo = require('../controllers/new');
router.post("/new",newInfo.createNew)
router.get("/news",newInfo.getNews)
router.get("/new/:id",newInfo.findNewById)
router.delete("/new",newInfo.deleteNew)
router.put("/new",newInfo.updateNew)
router.put("/sortnews", newInfo.sortNewsOrder);
module.exports = router
