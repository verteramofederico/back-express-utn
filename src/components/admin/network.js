const express = require('express')
const controller = require('./controller')

const router = express.Router()
const secured = require('../../middlewares/secured')

router.get('/login', controller.LoginPage)
router.post('/login', controller.Login)
router.get('/novedades', secured, controller.NewsPage)
router.get('/novedades/agregar', secured, controller.NewsAddPage)
router.post('/novedades/agregar', secured, controller.NewsAddPost)
router.get('/logout', controller.Logout)

module.exports = router