const db = require("../config/db");
const userModel = "../schema/users";

const Transform = db.TransfromSequelize;
const User = Transform.import(userModel);

// 登录请求方法
const login = async function(data) {
  const result = await User.findOne({
    where: {
      user_name: data.user_name,
      password: data.password
    }
  });
  return result;
}

// 注册请求方法
const register = async function(data) {
  const result = await User.create({
    user_name: data.userName,
    password: data.password
  });
  return result;
}

module.exports = {
  login,
  register
}
