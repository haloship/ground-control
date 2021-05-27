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
const parser = new Readline({ delimiter: '\r\n\r\n' })
port.pipe(parser);
var sensorDataObject = {
  temp: 0,
  pressure: 0,
  Lat: 0,
  Long: 0,
  Height: 0,
  date:0,
  time:0
}

io.on('connection', (socket) => {
  console.log("Someone connected."); //show a log as a new client connects.
})

parser.on('data', (sensordata) => { //Read data
  console.log("before");
  console.log(sensordata);
  var serialArr = sensordata.split("\r\n")
  serialArr.forEach(function(part, index) {
    var line = this[index];
    var strinArr = line.split(" ")
    strinArr[0]='"'+strinArr[0]+'"'
    this[index] = strinArr.join("")

  }, serialArr);
  
  console.log(serialArr);

  var dataObj = JSON.parse("{"+serialArr.join()+"}");

  console.log(dataObj)
  io.sockets.emit('temperature', dataObj);
  

  // try{
  // sensorDataObject['temp'] = parseFloat(serialArr[1].split(" ")[2])
  // sensorDataObject['pressure'] = parseFloat(serialArr[2].split(" ")[2])
  // sensorDataObject['Lat'] = parseFloat(serialArr[4].split(" ")[2].replace('\r',''))
  // sensorDataObject['Long'] = parseFloat(serialArr[5].split(" ")[2])
  // sensorDataObject['Height'] = parseFloat(serialArr[6].split(" ")[4])}catch{console.log("error")}
  // console.log(sensorDataObject)
  // var today = new Date();
  // sensorDataObject['date'] = today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear();
  // sensorDataObject['time'] = (today.getHours())+":"+(today.getMinutes());
  // // io.sockets.emit('temperature', sensorDataObject);
  // io.sockets.emit('pressure', sensorDataObject);
  // io.sockets.emit('height', sensorDataObject);
  });


