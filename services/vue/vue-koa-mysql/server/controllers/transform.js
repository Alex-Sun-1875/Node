const transform = require("../models/transform");

const getTransformEntrys = async function(ctx) {
  const result = await transform.getTransformEntrys();
  return result;
}

module.exports = {
  getTransformEntrys
}
