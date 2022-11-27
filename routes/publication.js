const express = require('express');
const router = express.Router();
const publication = require('../controllers/Publication');
const verifyToken = require("../middlewares/index");
router.post("/publication",verifyToken, publication.createPub)
router.get("/publications",publication.getPublications)
router.delete("/publication",verifyToken, publication.deletePublication)
router.get("/publication/:id",publication.findPubById)
router.put("/publication",verifyToken, publication.updatePub);
router.put("/sortpub", verifyToken,  publication.sortPubOrder);
module.exports = router
