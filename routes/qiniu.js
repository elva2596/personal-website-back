const express = require("express");
const router = express.Router();
const addImg = require("../controllers/qiniu")
router.post("/admin/imgs",addImg)
module.exports = router;
