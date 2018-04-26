const adc = require('../adc');
const moment = require('moment');
const { convertTemp, convertDial } = require('./converttemp');

const tstat = {
  //constants
  minOnTime: 3500, //minimum time to let the heater run, in milli seconds
  minOffTime: 3500, //minimum time before turning heater back on, in milli seconds
  deadband: 2, //temp must be above setpoint by half of deadband to turn off heater, and below setpoint by half of deadband to turn on

  //variables
  heat: false,
  lastOn: Date.now(),
  lastOff: Date.now() - 10000,
  temperature: null,
  activeSetpoint: 72,
  occSetpoint: 70,
  unoccSetpoint: 50,
  schedule: {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
  },
  temp: 73, //initial
  dial: 74.7, //initial
};

tstat.updateCh = () => {
  adc
    .ch0() //get temp
    .then(tempData => {
      tstat.temp = convertTemp(tempData); //data is in centivolts
      adc
        .ch1() //get dial
        .then(dialData => {
          tstat.dial = convertDial(dialData);
        })
        .catch(err => {
          throw err;
        });
    });
};

const scheduler = () => {
  //console.log('Occupied')
  let now = moment();
  //console.log(now.time())
  switch (now.day()) {
    case 1:
      console.log('mon');
      break;
    case 2:
      console.log('tues');
      break;
    case 3:
      console.log('wed');
      break;
    case 4:
      //console.log('thurs');
      //f(now.hour()>)
      break;
    case 5:
      console.log('fri');
      break;
    case 6:
      console.log('sat');
      break;
    case 7:
      console.log('sun');
      break;
    default:
      console.log('Scheduler Error');
  }
  tstat.activeSetpoint = tstat.dial;
};

const heatOn = () => {
  if (!tstat.heat && Date.now() > tstat.lastOff + tstat.minOffTime) {
    console.log('Heat On');
    tstat.lastOn = Date.now();
    tstat.heat = true;
  }
};

const heatOff = () => {
  if (tstat.heat && Date.now() > tstat.lastOn + tstat.minOnTime) {
    console.log('Heat Off');
    tstat.lastOff = Date.now();
    tstat.heat = false;
  }
};

tstat.checkTemp = () => {
  console.log(
    'Check Temp',
    tstat.temp.toFixed(1),
    'Setpoint',
    tstat.activeSetpoint.toFixed(1)
  );
  if (tstat.temp < tstat.activeSetpoint - tstat.deadband / 2) heatOn();
  if (tstat.temp > tstat.activeSetpoint + tstat.deadband / 2) ßheatOff();
};

tstat.start = () => {
  setInterval(tstat.updateCh, 1000);
  setInterval(tstat.checkTemp, 1000);
  setInterval(scheduler, 1000);
};

module.exports = tstat;
