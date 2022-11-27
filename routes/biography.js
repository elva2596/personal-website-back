const express = require('express');
const router = express.Router();
const biograhpy = require('../controllers/biography');
const verifyToken = require("../middlewares/index");
router.get("/biograhpy",biograhpy.getBio)
router.post("/biograhpy",verifyToken, biograhpy.createBio)
router.put("/biograhpy",verifyToken,biograhpy.updateBio)
module.exports = router
