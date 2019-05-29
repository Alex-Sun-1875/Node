const db = require("../config/db");
const transformModel = "../schema/transform";

const Transform = db.TransformSequelize;
const transformEntrys = Transform.import(transformModel);

const getTransformEntrys = async function(data) {
  const result = await transformEntrys.findAll();
  return result;
}

module.exports = {
  getTransformEntrys
}
