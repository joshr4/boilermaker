const router = require('express').Router();
const tstat = require('../thermostat')

module.exports = router;

router.get('/', function (req, res, next) {
  res.json(tstat)
});

router.get('/temp', function (req, res, next) {
  res.json(tstat.temp)
});

router.get('/dial', function (req, res, next) {
  res.json(tstat.dial)
});

router.get('/schedule', function (req, res, next) {
  res.json(tstat.schedule)
});

router.get('/setpoints', function (req, res, next) {
  res.json(tstat.setpoints)
});

router.get('/config', function (req, res, next) {
  res.json(tstat.config)
});

router.put('/schedule', function (req, res, next) {
  tstat.schedule = req.body.schedule
  res.json(tstat.schedule)
});

router.put('/setpoints', function (req, res, next) {
  tstat.setpoints = req.body.setpoints
  res.json(tstat.setpoints)
});

router.put('/config', function (req, res, next) {
  tstat.config = req.body.config
  res.json(tstat.config)
});
