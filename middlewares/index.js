const jwt  = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    if(req.headers["authorization"]){
      const token = req.headers["authorization"].split(' ')[1];
      console.log(jwt.decode(token))
      jwt.verify(token,process.env.JWT_SECRET,function (err,decoded){
        if(err){
          res.send({status:401,msg:err.name,data:'Unauthorization'})
        }else{
          next()
        }
      })
    }
  }
