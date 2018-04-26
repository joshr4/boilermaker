const router = require('express').Router();
const tstat = require('../thermostat')

module.exports = router;

router.get('/', function (req, res, next) {
  res.json(tstat)
});

router.get('/temp', function (req, res, next) {
  res.json(tstat.temp.value)
});

router.get('/dial', function (req, res, next) {
  res.json(tstat.dial.value)
});
