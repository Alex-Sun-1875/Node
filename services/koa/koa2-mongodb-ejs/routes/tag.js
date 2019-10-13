import { responseClient } from '../util/util';
import Tag from '../models/tag';

// 获取全部标签
exports.getTagList = async (ctx, next) => {
  let keyword = ctx.query.keyword || null;
  let pageNum = parseInt(ctx.query.pageNum) || 1;
  let pageSize = parseInt(ctx.query.pageSize) || 10;
  let conditions = {};
  if (keyword) {
    const reg = new RegExp(keyword, 'i');
    conditions = {
      $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }],
    };
  }
  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };
  /*
  Tag.countDocuments(conditions, (err, count) => {
    if (err) {
      console.error('err: ', err);
    } else {
      responseData.count = count;
      let fields = {
        _id: 1,
        name: 1,
        // desc: 1,
        // icon: 1,
        // create_time: 1,
        // update_time: 1,
      }; // 带返回字段
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };
      Tag.find(conditions, fields, options, (error, result) => {
        if (error) {
          console.error('err: ', error);
        } else {
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }
      });
    }
  });
  */
  try {
    let count = await Tag.countDocuments(conditions);
    responseData.count = count;
    let fields = {
      _id: 1,
      name: 1,
    };
    let options = {
      skip: skip,
      limit: pageSize,
      sort: { create_time: -1 },
    };
    let result = await Tag.find(conditions, fields, options);
    responseData.list = result;
    responseClient(ctx, 200, 0, '获取文章tag成功!', responseData);
  } catch (err) {
    console.log(err);
  }
};

exports.addTag = async (ctx, next) => {
  let { name, desc } = ctx.request.body;
  /*
  Tag.findOne({ name }).then(result => {
    if (!result) {
      let tag = new Tag({ name, desc, });
      tag.save().then(data => {
        responseClient(res, 200, 0, '添加成功!', data);
      }).catch(err => {
        throw err;
      });
    } else {
      responseClient(res, 200, 1, '该标签已存在!');
    }
  }).catch(err => {
    responseClient(res);
  });
  */
  try {
    let result = await Tag.findOne({ name }).exec();
    if (!result) {
      let tag = new Tag({ name, desc });
      let data = await tag.save();
      responseClient(ctx, 200, 0, "添加标签成功!", data);
    } else {
      responseClient(ctx, 200, 1, "改标签已经存在!");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.delTag = async (ctx, next) => {
  let { id } = ctx.request.body;
  /*
  Tag.deleteMany({ _id: id }).then(result => {
    if (result.n === 1) {
      responseClient(res, 200, 0, '删除成功!');
    } else {
      responseClient(res, 200, 1, '标签不存在!');
    }
  }).catch(err => {
    responseClient(res);
  });
  */
  try {
    let result = await Tag.deleteMany({ _id: id });
    if (result.n === 1) {
      responseClient(ctx, 200, 0, "成功删除标签!");
    } else {
      responseClient(ctx, 200, 1, "标签不存在!");
    }
  } catch (err) {
    console.log(err);
  }
};