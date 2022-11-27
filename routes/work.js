const express = require('express');
const router = express.Router();
const work = require('../controllers/work');
const verifyToken = require("../middlewares/index");
router.post("/work",verifyToken, work.createWork)
router.get("/work",work.getWorks)
router.delete("/work",verifyToken,work.deleteWork)
router.get("/work/:id",work.findWorksById)
router.put("/work",verifyToken, work.updateWork);
router.put("/sort", verifyToken, work.sortWork);
module.exports = router
