const express = require('express');
const router = express.Router();
const text = require('../controllers/text');
const verifyToken = require("../middlewares/index");
router.post("/text",verifyToken, text.createText)
router.get("/text/:id",text.findTextById)
router.get("/texts",text.getTexts)
router.delete("/text",verifyToken, text.deleteText)
router.put("/text",verifyToken, text.updateText)
router.put("/sorttexts", verifyToken, text.sortTextsOrder);
module.exports = router
