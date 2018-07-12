const adc = require('../adc');
const moment = require('moment');
const { convertTemp, convertDial } = require('./converttemp');
let gpio;

try {
  gpio = require('rpi-gpio');
  console.log('GPIO library loaded');
} catch (error) {
  gpio = false;
  //console.log(error);
  console.log('Failed to load GPIO library');
}

if (gpio) gpio.setup(7, gpio.DIR_OUT, write);

function write() {
  gpio.write(7, true, function(err) {
    if (err) throw err;
    //console.log('Written to pin');
  });
}

function writeOff() {
  gpio.write(7, false, function(err) {
    if (err) throw err;
    //console.log('Written to pin');
  });
}

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
    tempOccTime: 10000, //1 hour = 3600000 temporary occupancy
    dialLastAdjust: Date.now() - 10000,
  },
  schedule: {
    1: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    2: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    3: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    4: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    5: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    6: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
    0: [{ start: { hour: 8, minute: 0 }, end: { hour: 19, minute: 40 } }],
  },
  temp: 73, //initial
  dial: 74.7, //initial
  lastDial: 74.7,
};

tstat.updateCh = () => {
  adc
    .ch0() //get temp
    .then(tempData => {
      tstat.temp = convertTemp(tempData).toFixed(2); //data is in centivolts

      adc
        .ch1() //get dial
        .then(dialData => {
          tstat.dial = convertDial(dialData).toFixed(2);
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
    let start = timeSlot.start.hour * 60 + timeSlot.start.minute;
    let end = timeSlot.end.hour * 60 + timeSlot.end.minute;
    if (now > start && now < end) {
      return true;
    }
    return false;
  });
  if (occCheck.includes(true)) {
    if (!tstat.setpoints.occupied) {
      console.log('Occupied');
      tstat.setpoints.activeSetpoint = tstat.setpoints.occSetpoint;
      tstat.setpoints.occupied = true;
    }
  } else if (tstat.setpoints.occupied) {
    console.log('Unoccupied');
    tstat.setpoints.activeSetpoint = tstat.setpoints.unoccSetpoint;
    tstat.setpoints.occupied = false;
  }
  if (
    !tstat.setpoints.tempOccActive &&
    Date.now() < tstat.setpoints.tempOcc + tstat.setpoints.tempOccTime
  ) {
    tstat.setpoints.activeSetpoint = tstat.dial;
  }
};

const heatOn = () => {
  if (!tstat.heat && Date.now() > tstat.lastOff + tstat.config.minOffTime) {
    console.log('Heat On');
    //if (gpio) setTimeout(write, 10);
    tstat.lastOn = Date.now();
    tstat.heat = true;
  }
};

const heatOff = () => {
  if (tstat.heat && Date.now() > tstat.lastOn + tstat.config.minOnTime) {
    console.log('Heat Off');
    //if (gpio) setTimeout(writeOff, 10);
    tstat.lastOff = Date.now();
    tstat.heat = false;
  }
};

tstat.checkTemp = () => {
  console.log(
    'Check Temp',
    tstat.temp,
    'Setpoint',
    tstat.setpoints.activeSetpoint
  );
  if (tstat.temp < tstat.setpoints.activeSetpoint - tstat.config.deadband / 2)
    heatOn();
  if (tstat.temp > tstat.setpoints.activeSetpoint + tstat.config.deadband / 2)
    heatOff();
};

tstat.dialMonitor = () => {
  let changed = Math.abs(tstat.lastDial - tstat.dial);
  if (changed > 0.75) {
    tstat.setpoints.tempOcc = Date.now();
    tstat.setpoints.tempOccActive = true;
    tstat.setpoints.activeSetpoint = tstat.dial;
  }

  tstat.setpoints.activeSetpoint = tstat.dial;
  tstat.lastDial = tstat.dial;
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
