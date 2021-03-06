const Genre = require('../models/genre');
const Book = require('../models/book')
const async = require('async')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 显示完整的藏书种类列表
exports.genre_list = (req, res) => {
  // res.send('未实现：藏书种类列表');
  Genre.find()
    .sort([
      ['name']
    ])
    .exec(function (err, list_genre) {
      if (err) {
        return next(err)
      }
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genre
      })
    })
};

// 为每一类藏书显示详细信息的页面
exports.genre_detail = (req, res) => {
  // res.send('未实现：藏书种类详细信息：' + req.params.id);
  async.parallel({
    genre: function (callback) {
      Genre.findById(req.params.id).exec(callback)
    },
    genre_books: function (callback) {
      Book.find({
        'genre': req.params.id
      }).exec(callback)
    }
  }, function (err, results) {
    if (err) {
      return next(err)
    }
    if (results.genre == null) {
      var err = new Error('genre not found')
      err.status = 404
      return next(err)
    }
    res.render('genre_detail', {
      title: 'Genre Detail',
      genre: results.genre,
      genre_books: results.genre_books
    })
  })
}

// 由 GET 显示创建藏书种类的表单
exports.genre_create_get = (req, res, next) => {
  // res.send('未实现：藏书种类创建表单的 GET');
  res.render('genre_form', { title: 'Create Genre' })
};

// 由 POST 处理藏书种类创建操作
exports.genre_create_post = [
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  sanitizeBody('name').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    var genre = new Genre({ name: req.body.name })
    if (!errors.isEmpty()) {
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() })
      return
    } else {
      Genre.findOne({ 'name': req.body.name })
        .exec(function (err, found_genre) {
          if (err) { return next(err) }
          if (found_genre) {
            res.redirect(found_genre.url)
          } else {
            genre.save(function (err) {
              if (err) return next(err)
              res.redirect(genre.url)
            })
          }
        })
    }
  }
]

// 由 GET 显示删除藏书种类的表单
exports.genre_delete_get = (req, res) => {
  res.send('未实现：藏书种类删除表单的 GET');
};

// 由 POST 处理藏书种类删除操作
exports.genre_delete_post = (req, res) => {
  res.send('未实现：删除藏书种类的 POST');
};

// 由 GET 显示更新藏书种类的表单
exports.genre_update_get = (req, res) => {
  res.send('未实现：藏书种类更新表单的 GET');
};

// 由 POST 处理藏书种类更新操作
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新藏书种类的 POST');
};