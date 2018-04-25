const router = require('express').Router();
//const { Channel, Message } = require('../db/models');

module.exports = router;

router.get('/', function (req, res, next) {
  res.json('Get Request to /trends')
});
