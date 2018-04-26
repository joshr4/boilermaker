const adc = require('../adc');
const moment = require('moment');
const { convertTemp, convertDial } = require('./converttemp');

const tstat = {
  //constants
  minOnTime: 2500, //minimum time to let the heater run, in milli seconds
  minOffTime: 2500, //minimum time before turning heater back on, in milli seconds
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
    unoccSch: {},
    occSch: {},
  },
  temp: 65, //initial
  dial: 80, //initial
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
tstat.activeSetpoint = tstat.dial
};

const heatOn = () => {
  console.log('Heat On')
  tstat.heat = true
};

const heatOff = () => {
  //if(Date.now())
  console.log('Heat Off')
  tstat.heat = false
};

tstat.checkTemp = () => {
  console.log('Check Temp', tstat.temp.toFixed(1), 'Setpoint', tstat.dial.toFixed(1));
  if (tstat.temp < tstat.activeSetpoint - tstat.deadband / 2) heatOn()
  else if (tstat.temp > tstat.activeSetpoint + tstat.deadband / 2) heatOff()
};

tstat.start = () => {
  setInterval(tstat.updateCh, 1000);
  setInterval(tstat.checkTemp, 1000);
  setInterval(scheduler, 1000);
};

module.exports = tstat;
