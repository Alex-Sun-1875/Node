/**
 * User model module.
 * @file 权限和用户数据模型
 * @module model/User
 */

const crypto = require("crypto");
const { argv } = require("yargs");
const { mongoose } = require("../config/mongodb");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const adminSchema = new mongoose.Schema({
  // 第三方授权登录的 oatuth 表的 id
  // oauth_id: { type: String, default: \"\" },

  _id: Number,
  // 第三方授权登录的 github的用户的 id
  github_id: { type: String, default: "" },

  // 名字
  name: { type: String, required: true, default: "" },

  // 用户类型 0: 博主, 1: 其它用户, 2: github, 3: weixin, 4: qq
  // (0, 1 是注册用户, 2, 3, 4都是第三方授权登录用户)
  type: { type: Number, default: 0 },

  // 手机
  phone: { type: String, default: "" },

  // 封面
  img_url: { type: String, default: "" },

  // 邮箱
  email: {
    type: String,
    default: "",
    // required: true,
    // validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  },

  // 个人介绍
  introduce: { type: String, default: "" },
  
  // 头像
  avatar: { type: String, default: "user" },

  // 地址
  location: { type: String, default: "user" },

  // 密码
  password: {
    type: String,
    required: true,
    default: crypto.createHash("md5").update(argv.auth_default_password || "root").digest("hex"),
  },

  // 创建日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
}, {_id: false});

// 自增 ID 插件配置
adminSchema.plugin(AutoIncrement);

module.exports = mongoose.model("User", adminSchema);
