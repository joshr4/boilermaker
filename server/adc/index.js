var ads1x15;
try {
  ads1x15 = require('node-ads1x15');
} catch (e) {
    ads1x15 = require('./testingads')
    console.log('Faild to require ADS library, reverting to a simulated dummy function')
}

const Promise = require('bluebird');
const chip = 1; //0 for ads1015, 1 for ads1115

//Simple usage (default ADS address on pi 2b or 3):
const adc = new ads1x15(chip);

// Optionally i2c address as (chip, address) or (chip, address, i2c_dev)
// So to use  /dev/i2c-0 use the line below instead...:

//const adc = new ads1x15(chip, 0x48, 'dev/i2c-0');

//const channel = 0; //channel 0, 1, 2, or 3...
const samplesPerSecond = '250'; // see index.js for allowed values for your chip
const progGainAmp = '4096'; // see index.js for allowed values for your chip

adc.readCh = channel => {
  return new Promise(function(resolve, reject) {
    if (!adc.busy) {
      adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, function(
        err,
        data
      ) {
        if (err) {
          //console.log('Rejected')
          reject(err);
        }
        //console.log('Resolved')
        resolve(data);
      });
    }
  });
};

adc.ch1 = () => adc.readCh(1).then(data => data); //dial
adc.ch0 = () => adc.readCh(0).then(data => data); //temp

module.exports = adc;
