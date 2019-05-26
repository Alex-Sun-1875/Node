/* eslint-disable quotes */
/* eslint-disable no-multi-spaces */
const Sequelize =  require("sequelize");

const TransfromSequelize = new Sequelize(
  "koa",                    // 数据库名
  "vue-koa",                // 用户名
  "123456",                 // 用户密码
  {
    host: "localhost",
    dialect: "mysql",
    port: "3306",
    dialectOptions: {
      socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    },
    define: {
      underscored: true,    // 字段以下划线分割
      timestamps: false     // 取消自动添加时间戳
    }
  }
);

module.exports =  {
  TransfromSequelize
}
