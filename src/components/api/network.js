const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/novedades',controller.getNews)
router.post('/login',controller.Login)

module.exports = router