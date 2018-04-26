let Chance = require('chance');
let chance = new Chance(1234);

function ads1x15(chip) {
  this.temp = 210;
  this.dial = 240;
  this.busy = false;
}

ads1x15.prototype.readADCSingleEnded = (
  channel,
  progGainAmp,
  samplesPerSecond,
  callback
) => {
  let output
  if (!this.temp || !this.dial) {
    this.temp = 210;
    this.dial = 240;
  }
  if (channel === 1) {
    //dial 233=70F
    output = this.dial +
      chance.floating({ min: 1, max: 2 }) *
      chance.integer({ min: -1, max: 1 });
  }
  if (channel === 0) {
    //temp 200=70F
    output = this.temp +
      chance.floating({ min: 1, max: 2 }) *
      chance.integer({ min: -1, max: 1 });
  }
  callback(null, output);
};

module.exports = ads1x15;
