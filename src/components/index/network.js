const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const index = controller.Index()
    res.status(200).render('index', { title: 'Backend web FV' })
  } catch (Error) {
    res.status(500).send({ Error: 'Something has gone wrong' })
  }
})

module.exports = router