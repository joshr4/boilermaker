let Chance = require('chance');
let chance = new Chance(1234);

function ads1x15(chip) {
  //this.temp = 284;
  //this.dial = 240;
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
    this.temp = 284;
    this.dial = 240;
  }
  if (channel === 1) {
    //dial 233=70F
    this.dial +=
      chance.floating({ min: 0, max: 2 }) *
      chance.integer({ min: -1, max: 1 });
    output = this.dial
  }
  if (channel === 0) {
    //temp 284=66F
    this.temp +=
      chance.floating({ min: 0, max: 2 }) *
      chance.integer({ min: -1, max: 1 });
    output = this.temp
  }
  callback(null, output);
};

module.exports = ads1x15;
