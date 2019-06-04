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
    if (!bcrypt.compareSync(ctx.request.body.password, userInfo.password)) {
      ctx.body = {
        success: false,
        info: "Incorrect Password!"
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }

      const secret = "vue-koa-mysql"; // 指定密钥,这是之后用来判断 token 合法性的标志
      const token = jwt.sign(userToken, secret);
      ctx.body = {
        success: true,
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: "user not exists!"
    }
  }
}

const register = async function(ctx) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(ctx.request.body.password, salt);
  const data = {
    userName: ctx.request.body.userName,
    password: hash
  }

  const result = await users.register(data);

  ctx.body = {
    success: true
  }
}

module.exports = {
  login,
  register
}
