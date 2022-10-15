const express = require("express");
const router = express.Router();
const verifyToken  = require("../middlewares")
router.get("/admin/home",(req,res)=>{
  console.log(req.query.callback)
  let callback = req.query.callback
  // let name = req.query.name
  res.send(`${callback}({
    msg: 'success'
  })`)
});
module.exports = router;
