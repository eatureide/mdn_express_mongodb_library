const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

exports.index = (req, res) => {
  // res.send('未实现：站点首页');
  async.parallel({
    book_count: function (callback) {
      Book.count({}, callback)
    },
    book_instance_count: function (callback) {
      BookInstance.count({}, callback)
    },
    book_instance_available_count: function (callback) {
      BookInstance.count({
        status: 'Available'
      }, callback)
    },
    author_count: function (callback) {
      Author.count({}, callback)
    },
    genre_count: function (callback) {
      Genre.count({}, callback)
    }
  }, function (err, results) {
    res.render('index', {
      title: 'Local Library Home',
      error: err,
      data: results
    })
  })
};

// 显示完整的藏书列表
exports.book_list = (req, res, next) => {
  // res.send('未实现：藏书列表');
  Book.find({}, 'title author').
  populate('author').
  exec(function (err, list_books) {
    if (err) {
      return next(err)
    }
    res.render('book_list', {
      title: 'Book List',
      book_list: list_books
    })
  })
};

// 为每种藏书显示详细信息的页面
exports.book_detail = (req, res, next) => {
  // res.send('未实现：藏书详细信息：' + req.params.id);
  async.parallel({
    book: function (callback) {
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback)
    },
    book_instance: function (callback) {
      BookInstance.find({
          'book': req.params.id
        })
        .exec(callback)
    }
  }, function (err, results) {
    if (err) return next(err)
    if (results.book === null) {
      var err = new Error('Book not found')
      err.status = 404
      return next(err)
    }
    res.render('book_detail', {
      title: 'title',
      book: results.book,
      book_instances: results.book_instance
    })
  })
};

// 由 GET 显示创建藏书的表单
exports.book_create_get = (req, res) => {
  res.send('未实现：藏书创建表单的 GET');
};

// 由 POST 处理藏书创建操作
exports.book_create_post = (req, res) => {
  res.send('未实现：创建藏书的 POST');
};

// 由 GET 显示删除藏书的表单
exports.book_delete_get = (req, res) => {
  res.send('未实现：藏书删除表单的 GET');
};

// 由 POST 处理藏书删除操作
exports.book_delete_post = (req, res) => {
  res.send('未实现：删除藏书的 POST');
};

// 由 GET 显示更新藏书的表单
exports.book_update_get = (req, res) => {
  res.send('未实现：藏书更新表单的 GET');
};

// 由 POST 处理藏书更新操作
exports.book_update_post = (req, res) => {
  res.send('未实现：更新藏书的 POST');
};