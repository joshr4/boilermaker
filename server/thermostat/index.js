const adc = require('../adc');
const moment = require('moment');
const { convertTemp, convertDial } = require('./converttemp');

const tstat = {
  //constants
  config: {
    minOnTime: 3500, //minimum time to let the heater run, in milli seconds
    minOffTime: 3500, //minimum time before turning heater back on, in milli seconds
    deadband: 2, //temp must be above setpoint by half of deadband to turn off heater, and below setpoint by half of deadband to turn on
  },
  //variables
  heat: false,
  lastOn: Date.now(),
  lastOff: Date.now() - 10000,
  setpoints: {
    activeSetpoint: 72,
    occSetpoint: 70,
    unoccSetpoint: 50,
    occupied: true,
    tempOcc: Date.now(),
    dialLastAdjust: Date.now() - 10000,
  },
  schedule: {
    1: [],
    2: [],
    3: [],
    4: [
      [moment({ hour: 8, minute: 0 }), moment({ hour: 18, minute: 34 })],
      [moment({ hour: 18, minute: 35 }), moment({ hour: 19, minute: 55 })],
    ],
    5: [],
    6: [],
    7: [],
  },
  temp: 73, //initial
  dial: 74.7, //initial
  lastDial: 74.7,
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
  let now = moment().hour() * 60 + moment().minute();
  let day = moment().day();

  let occCheck = tstat.schedule[day].map(timeSlot => {
    let start = timeSlot[0].hour() * 60 + timeSlot[0].minute();
    let end = timeSlot[1].hour() * 60 + timeSlot[1].minute();
    if (now > start && now < end) {
      return true;
    }
    return false;
  });
  if (occCheck.includes(true)) {
    if (!tstat.setpoints.occupied) {
      console.log('Occupied')
      tstat.setpoints.activeSetpoint = tstat.setpoints.occSetpoint;
      tstat.setpoints.occupied = true;
    }
  } else if (tstat.setpoints.occupied) {
    console.log('Unoccupied')
    tstat.setpoints.activeSetpoint = tstat.setpoints.unoccSetpoint;
    tstat.setpoints.occupied = false;
  }
};

const heatOn = () => {
  if (!tstat.heat && Date.now() > tstat.lastOff + tstat.config.minOffTime) {
    console.log('Heat On');
    tstat.lastOn = Date.now();
    tstat.heat = true;
  }
};

const heatOff = () => {
  if (tstat.heat && Date.now() > tstat.lastOn + tstat.config.minOnTime) {
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
    tstat.setpoints.activeSetpoint.toFixed(1)
  );
  if (tstat.temp < tstat.setpoints.activeSetpoint - tstat.config.deadband / 2)
    heatOn();
  if (tstat.temp > tstat.setpoints.activeSetpoint + tstat.config.deadband / 2)
    heatOff();
};

tstat.dialMonitor = () => {
  let changed = Math.abs(tstat.lastDial - tstat.dial)

  if(changed > 2) {
    tstat.setpoints.tempOcc = Date.now()
    tstat.setpoints.occupied = true
    tstat.setpoints.activeSetpoint = tstat.dial
  }

  tstat.setpoints.activeSetpoint = tstat.dial
  let lastDial = tstat.dial;
};

tstat.start = () => {
  scheduler();
  tstat.updateCh();
  tstat.checkTemp();
  setInterval(tstat.dialMonitor, 1000);
  setInterval(tstat.updateCh, 1000);
  setInterval(tstat.checkTemp, 1000);
  setInterval(scheduler, 1000);
};

module.exports = tstat;
