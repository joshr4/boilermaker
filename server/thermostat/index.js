const adc = require('../adc');
const moment = require('moment');
const { convertTemp, convertDial } = require('./checktemp');

const tstat = {
  //constants
  minOnTime: 20000, //minimum time to let the heater run, in milli seconds
  minOffTime: 20000, //minimum time before turning heater back on, in milli seconds
  deadband: 2, //temp must be above setpoint by half of deadband to turn off heater, and below setpoint by half of deadband to turn on

  //variables
  heat: false,
  lastOn: Date.now(),
  lastOff: Date.now() - 10000,
  temperature: null,
  activeSetpoint: 70,
  occSetpoint: 70,
  unoccSetpoint: 50,
  schedule: {
    unoccSch: {},
    occSch: {},
  },
  temp: 65, //initial
  dial: 80, //initial
};

tstat.updateCh = () => {
  adc
    .ch0() //get temp
    .then(data => {
      tstat.temp = convertTemp(data); //data is in centivolts
      adc
        .ch1() //get dial
        .then(data => {
          tstat.dial = convertDial(data);
        })
        .catch(err => {
          throw err;
        });
    });
};

tstat.checkTemp = () => {
  console.log(
    'Check Temp',
    tstat.temp.toFixed(1),
    'Setpoint',
    tstat.dial.toFixed(1)
  );
  //console.log('Dial ', tstat.dial.value)
};

tstat.start = () => {
  setInterval(tstat.updateCh, 4000);
  setInterval(tstat.checkTemp, 4000);
};

module.exports = tstat;
