const express = require('express');
const router = express.Router();
const publication = require('../controllers/Publication');
router.post("/publication",publication.createPub)
router.get("/publications",publication.getPublications)
router.delete("/publication",publication.deletePublication)
router.get("/publication/:id",publication.findPubById)
router.put("/publication",publication.updatePub)
module.exports = router
