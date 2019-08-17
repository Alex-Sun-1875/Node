// utils/config.ts 配置文件，比如 github 授权登录的回调地址、client_id、client_secret 等。
const config = {
  oauth_uri: 'https://github.com/login/oauth/authorize',
  redirect_uri: 'https://localhost:3001/login',
  client_id: 'xxxxxx',
  client_secret: 'xxxxxx',
};

// 本地开发环境下
if ('development' === process.env.NODE_ENV) {
  config.redirect_uri = 'http://localhost:3001/login';
  config.client_id = '000000';
  config.client_secret = '000000';
}

export default config;
