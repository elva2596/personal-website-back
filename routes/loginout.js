const loginout = require('../controllers/loginout');
const express = require("express");
const router = express.Router();
const verifyToken  = require("../middlewares");
router.put('/admin/loginout',verifyToken,loginout);
module.exports = router;
