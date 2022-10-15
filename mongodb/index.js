const config = require("../config/default");
const mongoose = require("mongoose");
mongoose.connect(config.url,{server:{reconnectTries: Number.MAX_VALUE}});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('err',(err)=>{
  console.log("Error in Mongodb connection: "+err);
  mongoose.disconnect();
});
db.on('connected', ()=>{
	console.log('db connected');
});
db.on('close',()=>{
  console.log(`数据库断开，重新连接数据库`);
  // 确保数据库永远不会停止
  mongoose.connect(config.url,{server:{reconnectTries: Number.MAX_VALUE}});
});
module.exports = db;
