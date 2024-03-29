const express = require('express')
const router = express.Router()
const publication = require('../controllers/Publication')
const verifyToken = require('../middlewares/index')
router.post('/publication', verifyToken, publication.createPub)
router.get('/publication', publication.getPublications)
router.delete('/publication/:id', verifyToken, publication.deletePublication)
router.get('/publication/:id', publication.findPubById)
router.put('/publication/:id', verifyToken, publication.updatePub)
router.put('/sortpublication', verifyToken, publication.sortPubOrder)
module.exports = router
