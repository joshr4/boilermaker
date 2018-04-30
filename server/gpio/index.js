let gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, write);

function write() {
    gpio.write(4, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
