const Koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const logger = require("koa-logger");
const bodyparse = require("koa-bodyparser");

const app = new Koa();  // new 一个 koa 对象
const router = new Router();

// 加载中间件
// app.use() 函数返回 app 的 this 指针
app.use(router.routes()).use(router.allowedMethods());
app.use(json());
app.use(logger());
app.use(bodyparse());

/** 测试 api */
router.get("/api/test", (ctx, next) => {
  ctx.body = "hello world!";
});

app.listen(8000, () => {
  console.log("start success, http://localhost:8000");
});
