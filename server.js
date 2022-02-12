const dmxlib = require('dmxnet');

let switchChannel;
let mergeData = [];

console.log('Starting...');
const dmxnet = new dmxlib.dmxnet({
  log: { level: 'info' },
  oem: 0,
  sName: 'SC Artnet',
  lName: 'Sam Clay Artnet Switcher',
});

const receiver = dmxnet.newReceiver({
  subnet: 0,
  universe: 0,
  net: 0,
});

const receiver2 = dmxnet.newReceiver({
  subnet: 0,
  universe: 1,
  net: 0,
});

const receiver3 = dmxnet.newReceiver({
  subnet: 0,
  universe: 2,
  net: 0,
});

const sender = dmxnet.newSender({
  subnet: 0,
  universe: 3,
  net: 0,
  port: 6454,
});

receiver.on('data', (data) => {
  console.log('data', data[0]);
  switchChannel = data[0];
  console.log('switch', switchChannel);
  if (switchChannel > 100) {
    console.log('Output 2');
    receiver3.on('data', (data) => {
      mergeData = data;
    });
  } else {
    console.log('Output 1');
    receiver2.on('data', (data) => {
      mergeData = data;
    });
  }
  console.log('MergeData = ', mergeData[0]);
});
