// Test Machine IP: 192.168.0.126,
// Port: 7401

const osc = require('node-osc');

const client = new osc.Client('192.168.0.126', 7401);
client.send('', [255, 100, 10], (() => {
  client.kill();
}));

//

// client.send(['Testing']);