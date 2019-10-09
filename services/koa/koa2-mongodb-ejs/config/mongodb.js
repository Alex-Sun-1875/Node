/**
 * Mongoose module
 * @file 数据库模块
 * @module core/Mongoose
 */

const consola = require("consola");
const CONFIG = require("../app.config.js");
const mongoose = require("mongoose");

// remove DeprecationWaring
mongoose.set("useFindAndModify", true);
mongoose.set("useUnifiedTopology", true);

// mongoose Promise
mongoose.Promise = global.Promise;

// mongoose
exports.mongoose = mongoose;

// connect
exports.connect = () => {
  // 连接数据库
  mongoose.connect(CONFIG.MONGODB.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
  });

  mongoose.connection.on("error", error => {
    consola.warn("数据库连接失败!", error);
  });

  mongoose.connection.once("open", () => {
    consola.ready("数据库连接成功!");
  });

  return mongoose;
}