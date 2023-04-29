// imoprt libraries
import fs from 'fs';
import express from 'express';
import { Server } from "socket.io";

import { parsePacket } from "./scripts/parse.js";
import { messageSetup } from "./scripts/message.js";


// Initialize app
var app = express();
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
  console.log("Listening to requests on port 4000...");
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8100",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
}); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /

// const SerialPort = require('serialport');
import SerialPort from 'serialport';
// const { parsePacket } = require('./scripts/parse');
const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('/dev/ttyACM0', { baudRate: 115200 }); //Connect serial port to port /dev/ttyACM0.
const port = new SerialPort('/dev/tty.usbmodem355D357033391', { baudRate: 115200 }); //Connect serial port to port /dev/ttyACM0. 
const parser = new Readline({ delimiter: '\r\n' })
port.pipe(parser);

let date = new Date();
let fileName = "data/" + String(date.getDate()) + "-" + String(date.getHours()) + ":" + String(date.getMinutes());
io.on('connection', (socket) => {
  console.log("Someone connected."); //show a log as a new client connects.

  messageSetup(socket, port);
});
var dataObj = {
  Time: "20210630T06:52:47Z",
  State: "S0",
  groundLatitude: 34.0618377,
  groundLongitude: -118.3012118,
  Pressure: 1016.409424,
  Temperature: 26.479166,
  HeightAboveMSL: 24.963,
  Latitude: 33.9166590,
  Longitude: -118.3337104,
  xOrientation: 1,
  yOrientation: 2,
  zOrientation: -1,
  xAcceleration: 2,
  yAcceleration: 1,
  zAcceleration: -2,
  xGyro: 1,
  yGyro: 2,
  zGyro: -1
}

parser.on('data', (sensordata) => { //Read data
  console.log(sensordata);
  var processedData = parsePacket(dataObj, sensordata);

  fs.appendFile(fileName + "-process", processedData, function (err) {
    if (err) throw err;
    console.log('Saved processed!');
  });

  fs.appendFile(fileName + "-raw", sensordata, function (err) {
    if (err) throw err;
    console.log('Saved raw!');
  });

  console.log(dataObj)
  // io.sockets.emit('sensorData', dataObj)

});

setInterval(() => io.sockets.emit('sensorData', dataObj), 1000);

// io.socket. recerive






