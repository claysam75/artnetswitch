const dmxlib = require('dmxnet');
const fs = require('fs');

let configDataRaw = fs.readFileSync('artConfig.json');
let config = JSON.parse(configDataRaw);

console.log('Starting...');
const dmxnet = new dmxlib.dmxnet({
  log: { level: 'info' },
  oem: 0,
  sName: 'SC Artnet',
  lName: 'Sam Clay Artnet Switcher',
});

console.log(config.receivers[0].subnet);
console.log(config.receivers.length);

for (let i = 0; i < config.receivers.length; i++) {
  var receiver = dmxnet.newReceiver({
    subnet: config.receivers[i].subnet,
    universe: config.receivers[i].universe,
    net: config.receivers[i].net,
  });
}
