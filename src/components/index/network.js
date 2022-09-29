const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.Index)
router.post('/', controller.Login)
router.get('/', controller.Logout)

module.exports = router