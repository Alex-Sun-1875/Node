/**
 * Option model module.
 * @file 设置网站数据模型
 * @module model/option
 */

const { mongoose } = require('../core/mongodb');

const optionSchema = mongoose.Schema({
  // 网站标题
  title: { type: String, required: true },

  // logo 图片
  logo: { type: String, required: true },

  // 网站副标题
  sub_title: { type: String, required: true },

  // 关键字
  keywords: [{ type: String }],

  // 网站描述
  description: { type: String },

  // 站点地址
  site_url: { type: String, required: true },

  // 网站官邮
  site_email: { type: String },

  // 备案号
  site_icp: { type: String },

  // 搜索引擎 ping
  ping_sites: [{ type: String, validate: /\S+/ }],

  // 其它元信息
  meta: {
    // 被喜欢次数
    likes: { type: Number, default: 0 }
  },
});

module.exports = mongoose.model('Option', optionSchema);