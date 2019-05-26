const Koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const logger = require("koa-logger");
const bodyparse = require("koa-bodyparser");

const transform = require("./server/controllers/transform");

const app = new Koa();  // new 一个 koa 对象
const router = new Router();

// 加载中间件
// app.use() 函数返回 app 的 this 指针
app.use(router.routes()).use(router.allowedMethods());
app.use(json());
app.use(logger());
app.use(bodyparse());

/** 测试 api */
router.get("/api/test", async (ctx, next) => {
  await function() { console.log("33333") };
  ctx.body = "hello world!";
});

router.get("/transform/entrys", async (ctx, next) => {
  const result = await transform.getTransformEntrys();
  ctx.body = result;
});

app.listen(8000, () => {
  console.log("start success, http://localhost:8000");
});
