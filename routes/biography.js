const express = require('express');
const router = express.Router();
const biograhpy = require('../controllers/biography');
router.get("/biograhpy",biograhpy.getBio)
router.post("/biograhpy",biograhpy.createBio)
router.put("/biograhpy",biograhpy.updateBio)
module.exports = router
