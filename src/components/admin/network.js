const express = require('express')
const controller = require('./controller')

const router = express.Router()
const secured = require('../../middlewares/secured')

router.get('/login', controller.LoginPage)
router.post('/login', controller.Login)
router.get('/novedades', secured, controller.NewsPage)
router.get('/novedades/agregar', secured, controller.NewsAddPage)
router.post('/novedades/agregar', secured, controller.NewsAddPost)
router.get('/novedades/modificar/:id', secured, controller.getNewById)
router.post('/novedades/modificar', secured, controller.modifyNewById)
router.get('/novedades/eliminar/:id', secured, controller.deleteNewById)
router.get('/logout', controller.Logout)

module.exports = router