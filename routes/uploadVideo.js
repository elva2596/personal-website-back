const express = require("express");
const router = express.Router();
const uploadVideo = require("../controllers/uploadVideo");
router.post("/upload_video", uploadVideo)
module.exports = router;
