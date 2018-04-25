const router = require('express').Router();
const stat = require('../stat')

module.exports = router;

router.get('/', function (req, res, next) {
  res.json(stat)
});

router.get('/temp', function (req, res, next) {
  res.json(stat.temp.value)
});

router.get('/dial', function (req, res, next) {
  res.json(stat.dial.value)
});
