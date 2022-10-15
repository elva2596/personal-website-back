const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact');
router.get("/contact",contact.getContact)
router.post("/contact",contact.createContact)
router.put("/contact",contact.updateContact)
module.exports = router
