const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/index");
const getToken = require("../controllers/getToken");
router.get("/token", verifyToken, getToken)
module.exports = router;
