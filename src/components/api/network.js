const express = require('express')
const controller = require('./controller')

const router = express.Router()
const auth = require('../../middlewares/auth')

router.get('/novedades',controller.getNews)
router.post('/login',controller.Login)
router.post('/modificar', auth, controller.modifyNewById)
router.post('/contacto',controller.Contact)
router.get('/test', auth,controller.Test)

module.exports = router