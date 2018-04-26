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
    //dial 233=70F
    // this.dial +=
    //   chance.floating({ min: 0, max: 2 }) * chance.integer({ min: -1, max: 1 });
    output = this.dial;
  }
  if (channel === 0) {
    //temp 284=66F
    let heat = 1;
    if (tstat.heat) heat = -1;
    else heat = 1;
    this.temp += chance.floating({ min: 0, max: 1 }) * heat;
    //chance.integer({ min: -1, max: 1 });
    output = this.temp;
  }
  callback(null, output);
};

module.exports = ads1x15;
