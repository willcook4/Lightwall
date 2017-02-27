module.exports = {
  'server': {
    'listen_port': 8080,
    'listen_host': '::'

		// drop privileges to:
		// 'uid': 'www-data',
		// 'gid': 'www-data'
  },
  'presets': [
    {
      label: 'On',
      values: {
        'office': { 0: 255,  1: 255,  2: 255,  3: 255,  4: 255 }
      }
    },
    {
      label: 'Off',
      values: {
        'office': { 0: 0,  1: 0,  2: 0,  3: 0,  4: 0 }
      }
    },
    {
      label: 'mid',
      values: {
        'office': { 0: 60,  1: 60,  2: 60,  3: 60,  4: 60 }
      }
    }
  ],
  universes: {
    'office': {
      'output': {
        'driver': 'enttec-usb-dmx-pro',
        'device': '/dev/tty.usbserial-EN099731'
      },
      'devices': [
        {
          'type': 'led1',
          'address': 0
        },
        {
          'type': 'led2',
          'address': 1
        },
        {
          'type': 'led3',
          'address': 3
        },
        {
          'type': 'led4',
          'address': 4
        }
      ]
    }
  }
};