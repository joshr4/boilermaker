let gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, writeOff);

function write() {
    gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}

function writeOff() {
  gpio.write(7, false, function(err) {
      if (err) throw err;
      console.log('Written to pin');
  });
}

setTimeout(writeOff, 10000)
setTimeout(write, 9000)
setTimeout(writeOff, 8000)
