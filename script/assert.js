const assert = require('assert').strict;

// 生成 AssertionError 以便稍后比较错误的消息:
const {message} = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

// 验证错误的输出:
try {
  assert.strictEqual(1, 2);
} catch(err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}

// Pass
assert.ifError(null);

// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0
assert.ifError(0);

// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: '错误'
assert.ifError('错误');

// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error
assert.ifError(new Error());

// 创建一些随机错误
let err;
(function errorName() {
  err = new Error('测试错误');
})();

(function ifErrorName() {
  assert.ifError(err);
})();
