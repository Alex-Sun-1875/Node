/**
 * Tag model module.
 * @file 标签数据类型
 * @module model/tag
 */

const { mongoose } = require("../config/mongodb");

// 标签模型
const tagSchema = new mongoose.Schema({
  // 标签名称
  name: { type: String, required: true, validate: /\S+/ },

  // 标签描述
  desc: String,

  // 图标
  icon: String,

  // 发布日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
});

// 自增 ID 配置
/*
tagSchema.plugin(autoIncrement.plugin, {
  model: "Tag",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
*/

// 标签模型
module.exports = mongoose.model("Tag", tagSchema);
