import Article from '../models/article';
import User from '../models/user';
import { responseClient, timestampToTime } from '../util/util';

exports.addArticle = async (ctx, next) => {
  const {
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin,
  } = ctx.request.body;
  let tempArticle = null;
  if (img_url) {
    tempArticle = new Article({
      title,
      author,
      keyword: keyword ? keyword.split(',') : [],
      content,
      numbers: content.length,
      desc,
      img_url,
      tags: tags ? tags.split(',') : [],
      category: category ? category.split(',') : [],
      state,
      type,
      origin,
    });
  } else {
    tempArticle = new Article({
      title,
      author,
      keyword: keyword ? keyword.split(',') : [],
      content,
      numbers: content.length,
      desc,
      tags: tags ? tags.split(',') : [],
      category: category ? category.split(',') : [],
      state,
      type,
      origin,
    });
  }

  /*
  tempArticle.save().then(data => {
    responseClient(res, 200, 0, '保存成功', data);
  }).catch(err => {
    console.log(err);
    responseClient(res);
  });
  */

  try {
    const result = await tempArticle.save();
    responseClient(ctx, 200, 0, "保存成功", result);
  } catch (err) {
    responseClient(ctx);
  }
};

exports.updateArticle = async (ctx, next) => {
  const {
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin,
    id,
  } = ctx.request.body;
  Article.update(
    { _id: id },
    {
      title,
      author,
      keyword: keyword ? keyword.split(',') : [],
      content,
      desc,
      img_url,
      tags: tags ? tags.split(',') : [],
      category: category ? category.split(',') : [],
      state,
      type,
      origin,
    },
  ).then(result => {
    responseClient(res, 200, 0, '操作成功', result);
  }).catch(err => {
    console.error(err);
    responseClient(res);
  });
};

exports.delArticle = async (ctx, next) => {
  let { id } = ctx.body;
  Article.deleteMany({ _id: id })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, '删除成功!');
      } else {
        responseClient(res, 200, 1, '文章不存在');
      }
    }
    ).catch(err => {
      console.error('err: ', err);
      responseClient(res);
    });
};

// 前台文章列表
exports.getArticleList = async (ctx, next) => {
  let keyword = ctx.query.keyword || null;
  let state = ctx.query.state || '';
  let likes = ctx.query.likes || '';
  let tag_id = ctx.query.tag_id || '';
  let category_id = ctx.query.category_id || '';
  let article = ctx.query.article || '';
  let pageNum = parseInt(ctx.query.pageNum) || 1;
  let pageSize = parseInt(ctx.query.pageSize) || 10;

  // 如果是归档文章, 返回全部文章
  if (article)
    pageSize = 1000;
  let conditions = {};
  if (!state) {
    if (keyword) {
      const reg = new RegExp(keyword, 'i'); // 不区分大小写
      conditions = {
        $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
      };
    }
  } else if (state) {
    state = parseInt(state);
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = {
        $and: [
          { $or: [{ state: state }] },
          {
            $or: [
              { title: { $regex: reg } },
              { desc: { $regex: reg } },
              { keyword: { $regex: reg } },
            ],
          },
        ],
      };
    } else {
      conditions = { state };
    }
  }

  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };

  /*
  Article.countDocuments({}, (err, count) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      responseData.count = count;
      // 待返回的字段
      let fields = {
        title: 1,
        desc: 1,
        img_url: 1,
        tags: 1,
        category: 1,
        meta: 1,
        create_time: 1,
      };
      if (article) {
        fields = {
          title: 1,
          create_time: 1,
        };
      }
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };
      console.log("###sunlh### getArticleList 1111");
      Article.find(conditions, fields, options, (error, result) => {
        if (error) {
          console.log('Error: ' + error);
          // throw error:
        } else {
          let newList = [];
          if (likes) {
            // 根据热度 likes 返回数据
            result.sort((a, b) => {
              return b.meta.likes - a.meta.likes;
            });
            responseData.list = result;
          } else if (category_id) {
            // 根据分类 ID 返回数据
            result.forEach(item => {
              if (item.category.indexOf(category_id) != -1) {
                newList.push(item);
              }
            });
            let len = newList.length;
            responseData.count = len;
            responseData.list = newList;
          } else if (tag_id) {
            // 根据标签 id 返回数据
            result.forEach(item => {
              if (item.tags.indexOf(tag_id) != -1) {
                newList.push(item);
              }
            });
            let len = newList.length;
            responseData.count = len;
            responseData.list = newList;
          } else if (article) {
            archiveList = [];
            let obj = {};
            // 按照你分归档 文章数组
            result.forEach((e) => {
              let year = e.create_time.getFullYear();
              if (!obj[year]) {
                obj[year] = [];
                obj[year].push(e);
              } else {
                obj[year].push(e);
              }
            });
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                let item = {};
                item.year = key;
                item.list = element;
                archiveList.push(item);
              }
            }
            archiveList.sort((a, b) => {
              return b.year - a.year;
            });
            responseData.list = archiveList;
          } else {
            responseData.list = result;
          }
          responseClient(ctx, 200, 0, '操作成功', responseData);
          console.log("###sunlh### getArticleList 2222");
        }
      });
    }
  });
  */
  try {
    let count = await Article.countDocuments({});
    console.log("###sunlh### getArticleList: count = ", count);
    responseData.count = count;
    let fields = {
      title: 1,
      desc: 1,
      image_url: 1,
      tags: 1,
      category: 1,
      meta: 1,
      create_time: 1,
    };
    if (article) {
      fields = {
        title: 1,
        create_time: 1,
      };
    }
    let options = {
      skip: skip,
      limit: pageSize,
      sort: { create_time: -1 },
    };
    let result = await Article.find(conditions, fields, options);
    console.log("###sunlh### getArticleList: result = ", result);
    let newList = [];
    if (likes) {
      result.sort((a, b) => {
        return b.meta.likes - a.meta.likes;
      });
      responseData.list = result;
    } else if (category_id) {
      result.forEach(item => {
        if (item.category.indexOf(category_id) != -1) {
          newList.push(item);
        }
      });
      let len = newList.length;
      responseData.count = len;
      responseData.list = newList;
    } else if (article) {
      archiveList = [];
      let obj = {};
      result.forEach(e => {
        let year = e.create_time.getFullYear();
        if (!obj[year]) {
          obj[year] = [];
          obj[year].push(e);
        } else {
          obj[year].push(e);
        }
      });
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          let item = {};
          item.year = key;
          item.list = element;
          archiveList.push(item);
        }
      }
      archiveList.sort((a, b) => {
        return b.year = a.year;
      });
      responseData.list = archiveList;
    } else {
      responseData.list = result;
    }
    responseClient(ctx, 200, 0, '获取文章列表成功!', responseData);
  } catch (err) {
    console.log(err);
  }
};

// 后台文章列表
exports.getArticleListAdmin = async (ctx, next) => {
  let keyword = ctx.query.keyword || null;
  let state = ctx.query.state || '';
  let likes = ctx.query.likes || '';
  let pageNum = parseInt(ctx.query.pageNum) || 1;
  let pageSize = parseInt(ctx.query.pageSize) || 10;
  let conditions = {};
  if (!state) {
    if (keyword) {
      const reg = new RegExp('keyword', 'i'); // 不区分大小写
      conditions = {
        $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }],
      };
    }
  } else if (state) {
    state = parseInt(state);
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = {
        $and: [
          { $or: [{ state: state }] },
          {
            $or: [
              { title: { $regex: reg } },
              { desc: { $regex: reg } },
              { keyword: { $regex: reg } },
            ],
          },
        ],
      };
    } else {
      conditions = { state };
    }
  }

  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };

  /*
  Article.countDocuments({}, (err, count) => {
    if (err) {
      console.error('Error: ' + err);
    } else {
      responseData.count = count;
      // 待返回字段
      let fields = {
        title: 1,
        author: 1,
        keyword: 1,
        // content: 1,
        desc: 1,
        img_url: 1,
        tags: 1,
        category: 1,
        state: 1,
        type: 1,
        origin: 1,
        comment: 1,
        like_User_id: 1,
        meta: 1,
        create_time: 1,
        // update_time: 1,
      };
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };

      Article.find(conditions, fields, options, (error, result) => {
        if (err) {
          console.error('Error: ' + error);
        } else {
          if (likes) {
            result.sort((a, b) => {
              return b.meta.likes - a.meta.likes;
            });
          }
          responseData.list = result;
          responseClient(res, 200, 0, '操作成功!', responseData);
        }
      }).populate([
        { path: 'tags' },
        { path: 'comments' },
        { path: 'category' },
      ]).exec((err, doc) => {
        // console.log('doc: ');                         // aikin
        // console.log('doc.tags: ', doc.tags);          // aikin
        // console.log('doc.category: ', doc.category);  // undefined
      });
    }
  });
  */
  try {
    let count = await Article.countDocuments({});
    responseData.count = count;
    let fields = {
      title: 1,
      author: 1,
      keyword: 1,
      // content: 1,
      desc: 1,
      img_url: 1,
      tags: 1,
      category: 1,
      state: 1,
      type: 1,
      origin: 1,
      comment: 1,
      like_User_id: 1,
      meta: 1,
      create_time: 1,
      // update_time: 1,
    };
    let options = {
      skip: skip,
      limit: pageSize,
      sort: { create_time: -1 },
    };
    let result = await Article.find(conditions, fields, options).populate([
      { path: "tags" },
      { path: "comments" },
      { path: "category" },
    ]).exec();
    if (likes) {
      result.sort((a, b) => {
        return b.meta.likes - a.meta.likes;
      });
    }
    responseData.list = result;
    responseClient(ctx, 200, 0, "获取后台文章列表成功!");
  } catch (err) {
    console.log(err);
  }
};

// 文章点赞
exports.likeArticle = async (ctx, next) => {
  if (!ctx.request.session.userInfo) {
    responseClient(ctx, 200, 1, '您还没登录, 或者登录信息已过期, 请重新登录! ');
    return;
  }
  let { id, user_id } = ctx.request.body;
  /*
  Article.findOne({ _id: id }).then(data => {
    let fields = {};
    data.meta.likes = data.meta.likes + 1;
    fields.meta = data.meta;
    let like_users_arr = data.like_users.length ? data.like_users : [];
    User.findOne({ _id: id }).then(user => {
      let new_like_user = {};
      new_like_user.id = user._id;
      new_like_user.name = user.name;
      new_like_user.avatar = user.avatar;
      new_like_user.create_time = user.create_time;
      new_like_user.type = user.type;
      new_like_user.introduce = user.introduce;
      like_users_arr.push(new_like_user);
      fields.like_users = like_users_arr;
      Article.update({ _id: id }, fields).then(result => {
        responseClient(res, 200, 0, '操作成功! ', result);
      }).catch(err => {
        console.error('err: ', err);
        throw err;
      });
    }).catch(err => {
      responseClient(res);
      console.error('err 1: ', err);
    });
  }).catch(err => {
    responseClient(res);
    console.error('err 2: ', err);
  });
  */
  try {
    let data = await Article.find({ _id: id });
    let fields = {};
    data.meta.likes = data.meta.likes + 1;
    fields.meta = data.meta;
    let like_users_arr = data.like_users.length ? data.like_users : [];
    let user = await User.findOne({ _id: id }).exec();
    let new_like_user = {};
    new_like_user.id = user._id;
    new_like_user.name = user.name;
    new_like_user.avatar = user.avatar;
    new_like_user.create_time = user.create_time;
    new_like_user.type = user.type;
    new_like_user.introduce = user.introduce;
    like_users_arr.push(new_like_user);
    let result = await Article.update({ _id: id });
    responseClient(ctx, 200, 0, "操作成功!", result);
  } catch (err) {
    console.log(err);
  }
};

// 文章详情
exports.getArticleDetailByType = (req, res) => {
  let { type } = req.body;
  if (!type) {
    responseClient(res, 200, 1, '文章不存在! ');
    return;
  }
  Article.findOne({ type: type }, (err, data) => {
    if (err) {
      console.error('Error: ', err);
      // throw err;
    } else {
      data.meta.views = data.meta.views + 1;
      Article.updateOne({ type: type }, { meta: data.meta }).then(result => {
        responseClient(res, 200, 0, '操作成功! ', data);
      }).catch(err => {
        console.error('err: ', err);
        throw err;
      });
    }
  }).populate([
    { path: 'tags', select: '-_id' },
    { path: 'category', select: '-_id' },
    { path: 'comments', select: '-_id' },
  ]).exec((err, doc) => {
    // console.log('doc: ');                         // aikin
    // console.log('doc.tags: ', doc.tags);          // aikin
    // console.log('doc.category: ', doc.category);  // undefined
  });
};

// 文章详情
exports.getArticleDetail = (req, res) => {
  let id = req.body;
  let type = Number(req.body.type) || 1; // 文章类型 => 1: 普通文章, 2: 简历, 3: 管理介绍
  let filter = Number(req.body.filter) || 1; // 文章的评论过滤 => 1: 过滤, 2: 不过滤

  if (type === 1) {
    if (!id) {
      responseClient(res, 200, 1, '文章不存在! ');
      return;
    }
    Article.findOne({ _id: id }, (err, data) => {
      if (err) {
        console.error('Error: ', err);
      } else {
        data.meta.views = data.meta.views + 1;
        Article.updateOne({ _id: id }, { meta: data.meta }).then(result => {
          if (filter === 1) {
            const arr = data.comments;
            for (let i = arr.length - 1; i >= 0; --i) {
              const e = arr[i];
              if (e.state !== 1) {
                arr.splice(i, 1);
              }
              const newArr = e.other_comments;
              const length = newArr.length;
              if (length) {
                for (let j = length - 1; j >= 0; --j) {
                  const item = newArr[j];
                  if (item.state !== 1) {
                    newArr.splice(j, 1);
                  }
                }
              }
            }
          }
          responseClient(res, 100, 0, '操作成功! ', data);
        }).catch(err => {
          console.error('err: ', err);
          throw err;
        });
      }
    }).populate([
      { path: 'tags' },
      { path: 'category' },
      { path: 'comments' }
    ]).exec((err, doc) => {
      // console.log('doc:');                         // aikin
      // console.log('doc.tags: ', doc.tags);         // aikin  
      // console.log('doc.category: ', doc.category); // undefined
    });
  } else {
    Article.findOne({ type: type }, (err, data) => {
      if (err) {
        console.log('err: ', err);
      } else {
        if (data) {
          data.meta.views = data.meta.views + 1;
          Article.updateOne({ type: type }, { meta: data.meta }).then(result => {
            if (filter === 1) {
              const arr = data.comments;
              for (let i = arr.length - 1; i >= 0; --i) {
                const e = arr[i];
                if (e.state !== 1) {
                  arr.splice(i, 1);
                }
                const newArr = e.other_comments;
                const length = newArr.length;
                if (length) {
                  for (let j = length - 1; j >= 0; --j) {
                    const item = newArr[i];
                    if (item.state !== 1) {
                      newArr.splice(j, 1);
                    }
                  }
                }
              }
            }
            responseClient(res, 200, 0, '操作成功! ', data);
          }).catch(err => {
            console.error('err: ', err);
            throw err;
          });
        } else {
          responseClient(res, 200, 1, '文章不存在! ');
          return;
        }
      }
    }).populate([
      { path: 'tags' },
      { path: 'category' },
      { path: 'comments' }
    ]).exec((err, doc) => {
      // console.log('doc: ');                        // aikin
      // console.log('doc.tags: ', doc.tags);         // aikin
      // console.log('doc.category: ', doc.category); // undefined
    });
  }
};
