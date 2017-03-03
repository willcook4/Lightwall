# Lightwall
Code for a DMX controlled light feature.

####What is DMX?
DMX is a standard for control of lighting fixtures and other devices. Historically used in theatre and film lighting and effects. Connected devices listen to the constant stream of information for all the channels and act if the information for that particular addressed fixture changes. Updating the stream requires updating the buffer.

####The Plan
Initially the approach was to use [Open Lighting Architecture](https://www.openlighting.org/ola/) to control the dmx output via a python script. Although even with perseverance the compiled build failed to work for us. We looked at [simple DMX](https://github.com/c0z3n/pySimpleDMX) but this seemed to require large amounts of code to keep the state for the buffer and to continiously update the dmx stream. 
Finally after some quick tests we settled on [node-dmx](https://github.com/wiedi/node-dmx) as the base to build our application from.

####Challenges faced


###Technology used:

* axios npm package - HTTP Request handiling with Promises
* gulp - Build workflow, running babel
* babel - Transcompiling ES6 -> ES5 Javascript
* node-dmx - Controlling the dmx stream
* metar npm package - Parsing the METAR response from the API request
* Enntec dmx usb pro - USB -> DMX breakout
* Raspberry Pi - Running the node script from Debian based os 

###How to use:
1. Clone the repo: `git clone <package ssh/https info from github>`
2. Run `npm install` to install the dependencies.
3. cd into the `public` folder and then into `js`.
4. Run `node runfile.js`, the script should run.
4. If you want/need to edit, open the source directory and edit the files in there. Then run `gulp` this will update the public folder.
   

