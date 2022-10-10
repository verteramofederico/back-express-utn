const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.Index)

module.exports = router