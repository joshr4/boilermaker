let Chance = require('chance');
let chance = new Chance(1234);

function ads1x15(chip) {
  this.busy = false;
}

ads1x15.prototype.readADCSingleEnded = (
  channel,
  progGainAmp,
  samplesPerSecond,
  callback
) => {
  let tstat = require('../thermostat/index');
  let output;
  if (!this.temp || !this.dial) {
    this.temp = 260; //intial 280 = 65
    this.dial = 180; //intial 180 = 75
  }
  if (channel === 1) {
    this.dial +=
      chance.floating({ min: 0, max: 1 }) * chance.integer({ min: -1, max: 1 });
    output = this.dial;
  }
  if (channel === 0) {
    let heat = 1;
    if (tstat.heat) heat = -1;
    else heat = 0.3;
    this.temp += chance.floating({ min: 1, max: 4 }) * heat;
    //chance.integer({ min: -1, max: 1 });
    output = this.temp;
  }
  callback(null, output);
};

module.exports = ads1x15;
