/**
 * Project model module.
 * @file 项目模型
 * @module model/project
 */

const { mongoose } = require("../config/mongodb");

// 项目模型
const projectSchema = new mongoose.Schema({
  // 标题
  title: { type: String, required: true },

  // 项目内容
  content: { type: String, required: true },

  // 项目封面
  img: { type: String, required: true },

  // 项目链接
  url: { type: String, required: true },

  // 状态 1 是已经完成, 2 是正在进行, 3 是没完成
  state: { type: Number, default: 1 },

  // 开始日期
  start_time: { type: Date, default: Date.now },

  // 结束日期
  end_time: { type: Date, default: Date.now },

  // 最后修改时间
  update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
/*
projectSchema.plugin(autoIncrement.plugin, {
  model: "Project",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
*/

// 项目模型
module.exports = mongoose.model("Project", projectSchema);
