const router = require('express').Router();
const tstat = require('../thermostat');

module.exports = router;

router.get('/', function(req, res, next) {
  res.json(tstat);
});

router.get('/temp', function(req, res, next) {
  res.json(tstat.temp);
});

router.get('/dial', function(req, res, next) {
  res.json(tstat.dial);
});

router.get('/schedule', function(req, res, next) {
  res.json(tstat.schedule);
});

router.get('/setpoints', function(req, res, next) {
  res.json(tstat.setpoints);
});

router.get('/config', function(req, res, next) {
  res.json(tstat.config);
});

router.put('/schedule/:day', function(req, res, next) {
  tstat.schedule[req.params.day].push(req.body.slot.times);

  res.json(tstat.schedule.filter(day => day === req.params.day));
});

router.put('/setpoints/:type', function(req, res, next) {
  tstat.setpoints[req.params.type] = req.body.value;
  res.json(tstat.setpoints);
});

router.put('/config', function(req, res, next) {
  tstat.config = req.body.config;
  res.json(tstat.config);
});
