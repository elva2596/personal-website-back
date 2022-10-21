const express = require("express");
const app = express();
const config =  require("./config/default.js");
const db = require('./mongodb')
const bodyParser = require("body-parser")
const routes = require('./routes')
const dotenv = require('dotenv')
const compression = require('compression');
const schedule = require('node-schedule');
const { resetOrder } = require("./controllers/work");
const { resetExhOrder } = require("./controllers/exhibition");
const { resetPubOrder } = require("./controllers/Publication");
const { resetNewsOrder } = require("./controllers/new");
const { resetTextsOrder } = require("./controllers/text");
console.log('resetOrder:', resetOrder)
// resetOrder();
// test order重置。
setTimeout(() => {
  // resetTextsOrder()
  // resetExhOrder();
  // resetOrder()
  // resetPubOrder();
  // resetNewsOrder();
  
}, 1000)

// 作品order reset
const resetOrderJob = schedule.scheduleJob({hour: 3, minute: 49}, resetOrder);

// 展览order reset
const resetOrderJob2 = schedule.scheduleJob({hour: 3, minute: 49}, resetExhOrder);

// 出版物 order reset
const resetPubOrderJob = schedule.scheduleJob({hour: 3, minute: 49}, resetPubOrder);

// 新闻order reset
const resetNewsOrderJob = schedule.scheduleJob({hour: 3, minute: 49}, resetNewsOrder);

// 文本order reset
const resetTextsOrderJob = schedule.scheduleJob({hour: 3, minute: 49}, resetTextsOrder);

dotenv.config();
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

/*

 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");//预检请求使用
    next();
});

routes(app)
app.set("port",config.port);
app.listen(app.get('port'),()=>{
  console.log(`Express server is listening port: ${config.port}`);
})
