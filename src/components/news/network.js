const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const menu = controller.NewsResponse()
    res.status(200).send(menu)
  } catch (Error) {
    res.status(500).send({ Error: 'Something has gone wrong' })
  }
})

module.exports = router