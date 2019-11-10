const Author = require('../models/author');
const async = require('async')
const Book = require('../models/book')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 显示完整的作者列表
exports.author_list = (req, res) => {
  // res.send('未实现：作者列表');
  Author.find()
    .sort([
      ['family_name', 'ascending']
    ])
    .exec(function (err, list_authors) {
      if (err) {
        return next(err)
      }
      res.render('author_list', {
        title: 'Author List',
        author_list: list_authors
      })
    })
};

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res, next) => {
  // res.send('未实现：作者详细信息：' + req.params.id);
  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id)
        .exec(callback)
    },
    authors_books: function (callback) {
      Book.find({
        'author': req.params.id
      }, 'title summary')
        .exec(callback)
    }
  }, function (err, results) {
    if (err) return next(err)
    if (results.author === null) {
      var err = new Error('Author not found')
      err.status = 404
      return next(err)
    }
    res.render('author_detail', {
      title: 'Author Detail',
      author: results.author,
      author_books: results.authors_books
    })
  })
};

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => {
  // res.send('未实现：作者创建表单的 GET');
  res.render('author_form', { title: 'Create Author' })
};

// 由 POST 处理作者创建操作
exports.author_create_post = [
  body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified').isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
  body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified').isAlphanumeric().withMessage('Family name has non-alphanumeric characters'),
  body('date_of_birth', 'invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  //sanitize fields
  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() })
      return
    }
    else {
      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
      })
      author.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.redirect(author.url);
      });
    }
  }
]

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => {
  res.send('未实现：作者删除表单的 GET');
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {
  res.send('未实现：删除作者的 POST');
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET');
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST');
};