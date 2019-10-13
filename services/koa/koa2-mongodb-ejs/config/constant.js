/**
 * Constants module.
 * @file 数据表常量模块
 * @module core/Constants
 */

 // 发布状态
exports.PUBLISH_STATE = {
  draft: 0,       // 草稿
  published: 1,   // 已经发布
  recycle: -1,    // 回收站
};

// 公开状态
exports.PUBLIC_STATE = {
  password: 0,    // 需要密码
  public: 1,      // 公开状态
  hybrid: -1,     // 私密
};

// 转载状态
exports.ORIGIN_STATE = {
  original: 0,    // 原创
  reprint: 1,     // 转载
  hybrid: -1,     // 混合
};

exports.COMMENT_STATE = {
  auditing: 0,    // 待审核
  published: 1,   // 通过审核
  deleted: -1,    // 已删除
  spam: -2,       // 垃圾评论
};

// 评论宿主页面的 POST_ID 类型
exports.COMMENT_POST_TYPE = {
  guestbook: 0,   // 留言板
};

// 评论本身的类型
exports.COMMENT_PARENT_TYPE = {
  self: 0,        // 自身一级评论
};

// 排序状态
exports.SORT_TYPE = {
  asc: 1,         // 升序
  desc: -1,       // 降序
};

// 喜欢类型
exports.LIKE_TYPE = {
  comment: 1,
  page: 2,
};

// Session 设置
exports.SESSION_CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};