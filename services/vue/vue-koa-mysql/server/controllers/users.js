const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 登录
const login = async function(ctx) {
  const data = {
    user_name: ctx.request.body.userName
  };

  const userInfo = await users.login(data);

  if (null != userInfo) {

  }
}