'use strict';

// Test Machine IP: 192.168.0.126,
// Port: 7401

var osc = require('node-osc');

var client = new osc.Client('192.168.0.126', 7401);
client.send('', [255, 100, 10], function () {
  client.kill();
});

//

// client.send(['Testing']);