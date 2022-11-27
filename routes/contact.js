const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact');
const verifyToken = require("../middlewares/index");
router.get("/contact",contact.getContact)
router.post("/contact",verifyToken, contact.createContact)
router.put("/contact",verifyToken, contact.updateContact)
module.exports = router
