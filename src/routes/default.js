const express = require('express')
const router = express.Router()

router.all('*', (_req, res) => {
  res.sendStatus(404)
})

module.exports = router