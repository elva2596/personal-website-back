const express = require('express');
const router = express.Router();
const work = require('../controllers/work');
router.post("/work",work.createWork)
router.get("/work",work.getWorks)
router.delete("/work",work.deleteWork)
router.get("/work/:id",work.findWorksById)
router.put("/work",work.updateWork);
router.put("/sort", work.sortWork);
module.exports = router
