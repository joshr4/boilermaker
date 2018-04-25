const router = require('express').Router()
module.exports = router

router.use('/thermostat', require('./thermostat'));
router.use('/trends', require('./trends'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
