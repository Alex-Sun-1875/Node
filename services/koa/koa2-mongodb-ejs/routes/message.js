import { responseClient } from '../util/util';
import Message from '../models/message';
import User from '../models/user';

// 获取全部留言
exports.getMessageList = (req, res) => {
  let keyword = req.query.keyword || null;
  let state = req.query.state || '';
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;
  let conditions = {};
  if (state === '') {
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = {
        content: { $regex: reg },
      };
    }
  } else if (state) {
    state = parseInt(state);
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = { $and: [{ $or: [{ state: state }] }, { $or: [{ content: { $regex: reg } }] }] };
    } else {
      conditions = { state };
    }
  } else {
    state = 0;
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      conditions = { $and: [{ $or: [{ state: state }] }, { $or: [{ content: { $regex: reg } }] }] };
    } else {
      conditions = { state };
    }
  }

  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };
  Message.countDocuments({}, (err, count) => {
    if (err) {
      console.error('err: ', err);
    } else {
      responseData.count = count;
      let fields = {
        user_id: 1,
        name: 1,
        avatar: 1,
        phone: 1,
        introduce: 1,
        content: 1,
        email: 1,
        state: 1,
        reply_list: 1,
        create_time: 1,
        // update_time: 1,
      };
      let options = {
        skip: skip,
        limit: pageSize,
        sort: { create_time: -1 },
      };
      Message.find(conditions, fields, options, (error, result) => {
        if (error) {
          console.error('err: ', error);
        } else {
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }
      });
    }
  });
};

// 添加留言
exports.addMessage = (req, res) => {
  let { user_id, content, email, phone, name } = req.body;
  // 如果用户已经注册, 保存用户的信息, 再保存留言内容
  if (user_id) {
    User.findById({ _id: id }).then(result => {
      if (result) {
        let message = new Message({
          user_id: result._id,
          name: name ? name : result.name,
          avatar: result.avatar,
          phone: result.phone,
          introduce: result.introduce,
          content: content,
          email: email ? email : result.email,
        });
        message.save().then(data => {
          responseClient(res, 200, 0, '添加成功!', data);
        }).catch(err => {
          console.error('err: ', err);
          throw err;
        });
      } else {

      }
    }).catch(err => {
      console.error('err: ', err);
      responseClient(res);
    });
  } else {
    // 直接保存留言内容
    let message = new Message({
      name: name,
      phone: phone,
      content: content,
      email: email,
    });
    message.save().then(data => {
      responseClient(res, 200, 0, '添加成功', data);
    }).catch(err => {
      console.error('err2: ', err);
      throw err;
    })
  }
};

// 删除
exports.delMessage = (req, res) => {
  let { id } = req.body;
  Message.deleteMany({ _id: id }).then(result => {
    if (result.n === 1) {
      responseClient(res, 200, 0, '删除成功!');
    } else {
      responseClient(res, 200, 1, '留言不存在或者已经删除!');
    }
  }).catch(err => {
    console.error('err: ', err);
    responseClient(res);
  });
};

// 详情
exports.getMessageDetail = (req, res) => {
  if (!req.session.userInfo) {
    responseClient(res, 200, 1, '您还没有登录, 或者登录信息已经过期, 请重新登录!');
    return;
  }
  let { id } = req.body;
  Message.findOne({ _id: id }).then(data => {
    responseClient(res, 200, 0, '操作成功', data);
  }).catch(err => {
    console.error('err: ', err);
    responseClient(res);
  });
};

// 回复留言
exports.addReplyMessage = (req, res) => {
  if (!res.session.userInfo) {
    responseClient(res, 200, 1, '您还没有登录, 或者登录信息已经过期, 请重新登录!');
    return;
  }
  let { id, state, content } = req.body;
  Message.findById({ _id: id }).then(result => {
    let list = result.reply_list;
    let item = {
      content: content,
    };
    list.push(item);
    Message.update(
      { _id: id },
      {
        state: parseInt(state),
        reply_list: list,
      },
    ).then(data => {
      responseClient(res, 200, 0, '操作成功!', data);
    }).catch(err => {
      console.error('err: ', err);
      responseClient(res);
    });
  }).catch(err => {
    console.error('err: ', err);
    responseClient(res);
  });
};