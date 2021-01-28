const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const path = "/dev/ttyACM1";
const port = new SerialPort(path)
const parser = new Readline()
port.pipe(parser)
parser.on('data', (x,y)=>{
  console.log(x);
  port.write('1');
})


// const SerialPort = require('serialport');
// // var SerialPort = serialport.SerialPort;
//
// // const Readline = SerialPort.parsers.Readline;
//
// var port = new SerialPort("/dev/ttyACM0", {
//     baudRate: 9600
//     // parser: serialport.parsers.readline("\n")
// });
// //
// // const port = new SerialPort("/dev/ttyACM0",{
// //     baudRate: 9600,
// //     parser: new Readline("\n")
// // });
//
//
// port.on("open", function () {
//     console.log('open');
//     port.on('data', function(data) {
//         console.log(data);
//     });
// });
