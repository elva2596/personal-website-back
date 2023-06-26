const express = require("express");
const router = express.Router();
const uploadFile = require("../controllers/uploadFile");
router.post("/upload_file", uploadFile)
module.exports = router;
