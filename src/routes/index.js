var express = require('express');
var router = express.Router();

//  Routes
const pong = require('../components/pong/network')
/* const news = require('../components/news/network')
const menu = require('../components/menu/network') */
/* const user = require('../components/user/network') */
const index = require('../components/index/network')
const admin = require('../components/admin/network')

router.use('/ping', pong)
/* router.use('/user', user)
router.use('/news', news)
router.use('/menu', menu) */
router.use('/admin', admin)
router.use('/', index)

module.exports = router;
