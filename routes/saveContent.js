const express = require("express");
const router = express.Router();
const saveContent = require("../controllers/saveContent");
router.post("/save_content", saveContent)
module.exports = router;
