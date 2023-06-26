const express = require("express");
const router = express.Router();
const uploadImage = require("../controllers/uploadImage");
router.post("/upload_image", uploadImage)
module.exports = router;
