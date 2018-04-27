const router = require('express').Router();
const tstat = require('../thermostat');

module.exports = router;

router.get('/', function(req, res, next) { //TESTED!
  res.json(tstat);
});

// router.get('/temp', function(req, res, next) {
//   res.json(tstat.temp);
// });

// router.get('/dial', function(req, res, next) {
//   res.json(tstat.dial);
// });

router.put('/schedule/:day', function(req, res, next) {
  tstat.schedule[req.params.day].push(req.body.slot.times);
  res.json(tstat.schedule.filter(day => day === req.params.day));
});

router.put('/schedule', function(req, res, next) {
  tstat.schedule = req.body;
  res.json(tstat.schedule);
});

router.put('/setpoints', function(req, res, next) { //TESTED!
  tstat.setpoints = req.body;
  res.json(tstat.setpoints);
});

router.put('/config', function(req, res, next) { //TESTED!
  tstat.config = req.body;
  res.json(tstat.config);
});
