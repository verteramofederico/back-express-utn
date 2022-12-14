var express = require('express');
var router = express.Router();

//  Routes
const pong = require('../components/pong/network')
const index = require('../components/index/network')
const admin = require('../components/admin/network')
const api = require('../components/api/network')

router.use('/ping', pong)
router.use('/admin', admin)
router.use('/api', api)
router.use('/', index)

module.exports = router;
