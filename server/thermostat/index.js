const adc = require('../adc');

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
  occSch: {},
  unoccSch: {},
  temp: {
    raw: 0,
    value: 70,
    res: 10,
    celsius: 20,
    constA: 0.002425308852122,
    constB: 0.000422711863267,
    constC: 0.000000355663515,
  }, //temp
  dial: { raw: 0, value: 65 }, //dial
};

tstat.updateCh = () => {
  adc.ch0() //get temp
      .then(data => {
          tstat.temp.raw = data
          //Steinhart - Hart Equation 1/T = A+B(LnR)+C(LnR)^3
          tstat.temp.res = 8.19 / (5000 / data - 1)
          tstat.temp.celsius = 1 / (tstat.temp.constA + tstat.temp.constB * Math.log(tstat.temp.res) + tstat.temp.constC * Math.pow(Math.log(tstat.temp.res), 3)) - 273.15
          tstat.temp.value = tstat.temp.celsius * 1.8 + 32
          console.log('Temp ', tstat.temp.value)
          adc.ch1() //get dial
              .then(data => {
                  tstat.dial.raw = data;
                  tstat.dial.value = (data - 873) / -9.28
                  tstat.occSetpoint = tstat.dial.value
                  console.log('Dial ', tstat.dial.value)
              })
              .catch(err => {
                  throw err
              })
      });
}

tstat.start = () => {
  //console.log('Dial ', this.dial.value)
 //console.log('Temp ', this.temp.value)
  setInterval(tstat.updateCh, 4000)
  //setInterval(tstat.compareTemp, 4000)
}

module.exports = tstat;
