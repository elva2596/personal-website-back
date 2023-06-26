module.exports = (app)=>{
  app.use('/api',require('./register.js'));
  app.use("/api",require("./login.js"));
  app.use("/api",require("./loginout"));
  app.use("/api",require("./home"));
  app.use("/api",require("./getUserByName"));
  app.use("/api",require("./qiniu"));
  app.use("/api",require('./work'));
  app.use("/api",require('./exhibition'))
  app.use("/api",require('./new'))
  app.use("/api",require('./publication'))
  app.use("/api",require('./text'))
  app.use("/api",require('./biography'))
  app.use("/api",require('./contact'))
  app.use("/api", require("./uploadImage"))
  app.use("/api", require("./uploadFile"))
  app.use("/api", require("./uploadVideo"))
  app.use("/api", require("./saveContent"))
};
