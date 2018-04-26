const temp = {
  res2: 9780, //static resistor value in voltage divider
  vref: 5000, //voltage reference for voltage divider - 500 centivolts
  constA: 0.001314558223,
  constB: 0.0002042882966,
  constC: 0.0000002090885833,
}

const convertTemp = (raw) => { //raw is in centivolts
  let resistance =
    raw *
    temp.res2 /
    temp.vref /
    (1 - raw / temp.vref);
  let celsius =
    1 /
      (temp.constA +
        temp.constB * Math.log(resistance) +
        temp.constC * Math.pow(Math.log(resistance), 3)) -
    273.15;
  return celsius * 1.8 + 32; //return farenheit
};

const convertDial = (raw) => { //raw is in centivolts
  return (raw - 873) / -9.28;
};

module.exports = {convertTemp, convertDial}
