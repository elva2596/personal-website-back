const express = require('express');
const router = express.Router();
const text = require('../controllers/text');
router.post("/text",text.createText)
router.get("/text/:id",text.findTextById)
router.get("/texts",text.getTexts)
router.delete("/text",text.deleteText)
router.put("/text",text.updateText)
router.put("/sorttexts", text.sortTextsOrder);
module.exports = router
