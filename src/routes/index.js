var express = require('express');
var router = express.Router();

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Back Restaurant FV' });
}); */

//  Routes
const pong = require('../components/pong/network')
const news = require('../components/news/network')
const menu = require('../components/menu/network')
const index = require('../components/index/network')

router.use('/ping', pong)
router.use('/news', news)
router.use('/menu', menu)
router.use('/', index)

module.exports = router;
