var express = require('express');
var async = require('async')
var router = express.Router();

const a = async.waterfall([
  function (callback) {
    callback(null, 'one', 'two');
  },
  function (arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two' 
    callback(null, 'three');
  },
  function (arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
  }
], function (err, result) {
  console.log(result)
  // result now equals 'done'
});



/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/catalog')
});

module.exports = router;