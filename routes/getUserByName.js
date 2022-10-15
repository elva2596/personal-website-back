const express = require("express");
const router = express.Router();
const getUserByName = require("../controllers/getUserByName")
console.log(getUserByName);
router.get("/getUser",getUserByName)
module.exports = router
