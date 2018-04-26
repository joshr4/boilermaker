const adc = require('../adc');

const updateCh = () => {
  adc.ch0() //get temp
      .then(data => {
          this.temp.raw = data
          //Steinhart - Hart Equation 1/T = A+B(LnR)+C(LnR)^3
          this.temp.res = 8.19 / (5000 / data - 1)
          this.temp.celsius = 1 / (this.temp.constA + this.temp.constB * Math.log(this.temp.res) + this.temp.constC * Math.pow(Math.log(this.temp.res), 3)) - 273.15
          this.temp.value = this.temp.celsius * 1.8 + 32
          console.log('Temp ', this.temp.value)
          adc.ch1() //get dial
              .then(data => {
                  this.dial.raw = data;
                  this.dial.value = (data - 873) / -9.28
                  this.occSetpoint = this.dial.value
                  console.log('Dial ', this.dial.value)
              })
              .catch(err => {
                  throw err
              })
      });
}

const startStat = () => {
  //console.log('Dial ', this.dial.value)
 //console.log('Temp ', this.temp.value)
 console.log(this)
  setInterval(this.updateCh(), 4000)
  //setInterval(this.compareTemp, 4000)
}

function Tstat() {
  //constants
  this.minOnTime = 20000 //minimum time to let the heater run, in milli seconds
  this.minOffTime = 20000 //minimum time before turning heater back on, in milli seconds
  this.deadband = 2 //temp must be above setpoint by half of deadband to turn off heater, and below setpoint by half of deadband to turn on

  //variables
  this.heat = false
  this.lastOn = Date.now()
  this.lastOff = Date.now() - 10000
  this.temperature = null
  this.activeSetpoint = 70
  this.occSetpoint = 70
  this.unoccSetpoint = 50
  this.occSch = {}
  this.unoccSch = {}
  this.temp = {
    raw: 0,
    value: 70,
    res: 10,
    celsius: 20,
    constA: 0.002425308852122,
    constB: 0.000422711863267,
    constC: 0.000000355663515,
  } //temp
  this.dial = { raw: 0, value: 65 } //dial
  this.updateCh = updateCh
  this.startStat = startStat
}

module.exports = Tstat;
