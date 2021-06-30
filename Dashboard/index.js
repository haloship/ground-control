// imoprt libraries
var fs = require('fs');
var express = require('express');

// Initialize app
var app = express();
var server = app.listen(4000, () => { //Start the server, listening on port 4000.
  console.log("Listening to requests on port 4000...");
})

var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8100",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
}); //Bind socket.io to our express server.

app.use(express.static('public')); //Send index.html page on GET /

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0', { baudRate: 115200 }); //Connect serial port to port /dev/ttyACM0. 
const parser = new Readline({ delimiter: '\r\n' })
port.pipe(parser);
// port.write("force quit");

let date = new Date();
fileName = "data/" + String(date.getDate()) + "-" + String(date.getHours()) + ":" + String(date.getMinutes());

io.on('connection', (socket) => {
  console.log("Someone connected."); //show a log as a new client connects.
  socket.on("launchReady", (ready) => {
    console.log("launchReady");
    port.write('hello from node\n', (err) => {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
    });
  });
})

var dataObj = {
  groundLatitude: 340618377,
  groundLongitude: -1183012118,
  Pressure: 1016.409424,
  Temperature: 26.479166,
  HeightAboveMSL: 24963,
  Latitude: 339166590,
  Longitude: -1183337104,
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
  var serialArr = sensordata.split("\n");
  if (serialArr.length > 2) {

    console.log(serialArr);

    fs.appendFile(fileName, sensordata, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    // var dataObj = JSON.parse("{"+serialArr.join()+"}");
    dataObj["groundLatitude"] = serialArr[0];
    dataObj["groundLongitude"] = serialArr[1];
    dataObj["Pressure"] = serialArr[2];
    dataObj["Temperature"] = serialArr[3];
    dataObj["HeightAboveMSL"] = serialArr[4];
    dataObj["Latitude"] = serialArr[5];
    dataObj["Longitude"] = serialArr[6];
    dataObj["xOrientation"] = 1;
    dataObj["yOrientation"] = 2;
    dataObj["zOrientation"] = -1;
    dataObj["xAcceleration"] = 2;
    dataObj["yAcceleration"] = 1;
    dataObj["zAcceleration"] = -2;
    dataObj["xGyro"] = 1;
    dataObj["yGyro"] = 2;
    dataObj["zGyro"] = -1;

    console.log(dataObj)

  }
});

setInterval(()=>io.sockets.emit('sensorData', dataObj), 1000);

// io.socket. recerive






