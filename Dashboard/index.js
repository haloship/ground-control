var fs = require('fs');
var express = require('express');
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
port.write("force quit");

let date = new Date();
fileName = "data/"+String(date.getDate())+"-"+String(date.getHours())+":"+String(date.getMinutes());


io.on('connection', (socket) => {
  console.log("Someone connected."); //show a log as a new client connects.
})

parser.on('data', (sensordata) => { //Read data
  console.log("before");
  console.log(sensordata);
  var serialArr = sensordata.split("\n");

  // serialArr.forEach(function(part, index) {
  //   var line = this[index];
  //   var strinArr = line.split(" ")
  //   strinArr[0]='"'+strinArr[0]+'"'
  //   this[index] = strinArr.join("")

  // }, serialArr);
  
  console.log(serialArr);

  fs.appendFile(fileName, sensordata, function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 

  // var dataObj = JSON.parse("{"+serialArr.join()+"}");
  var dataObj = {
    Pressure :serialArr[0],
    Temperature:serialArr[1],
    HeightAboveMSL:serialArr[2],
    Latitude:serialArr[3],
    Longitude:serialArr[4],
    xOrientation :1,
    yOrientation:2,
    zOrientation:-1,
    xAcceleration :2,
    yAcceleration:1,
    zAcceleration:-2,
    xGyro :1,
    yGyro:2,
    zGyro:-1


  }
  // dataObj["xOrientation"]=1;
  // dataObj["yOrientation"]=2;
  // dataObj["zOrientation"]=-2;
  // dataObj["yAcceleration"]=2;
  // dataObj["xAcceleration"]=1;
  // dataObj["zAcceleration"]=-2;
  // dataObj["xGyro"]=1;
  // dataObj["yGyro"]=2;
  // dataObj["zGyro"]=-1;


  console.log(dataObj)
  io.sockets.emit('sensorData', dataObj);
  

  });


