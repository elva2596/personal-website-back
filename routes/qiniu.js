const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/index");
const addImg = require("../controllers/qiniu");
const getToken = require("../controllers/getToken");
router.post("/admin/imgs",addImg);
router.get("/token", verifyToken, getToken)
module.exports = router;
