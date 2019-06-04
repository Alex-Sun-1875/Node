const db = require("../config/db");
const transformModel = "../schema/transform";

const Transform = db.TransformSequelize;
const TransformEntrys = Transform.import(transformModel);

const getTransformEntrys = async function(data) {
  const result = await TransformEntrys.findAll();
  return result;
}

const addEntry = async function(data) {
  await TransformEntrys.create({
    origin: data.origin,
    target: data.target
  });
}

const removeEntry = async function(data) {
  const result = await TransformEntrys.destroy({
    where: {
      origin: data.origin
    }
  });

  return result;
}

const updateEntry = async function(data) {
  const result = await TransformEntrys.update({
    origin: data.origin,
    target: data.target
  }, {
    where: {
      origin: data.origin
    }
  });

  return result;
}

module.exports = {
  getTransformEntrys,
  addEntry,
  removeEntry,
  updateEntry
}
