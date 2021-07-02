import { chartConfig, xyzChartConfig } from "./scripts/chartConfigs.js"
import { GPS, openStreetMap, updateMap } from "./scripts/gps.js"
import { lineCharts, updateLineCharts } from "./scripts/lineCharts.js";
import { buttonSetup } from "./scripts/buttons.js";
// import io from "socket.io"
var socket = io.connect('http://localhost:4000'); //connect to server


// Setup Date
var today = new Date();
var date = today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear();
document.getElementById('date').innerHTML = date;

// State Control Button Setup
buttonSetup(socket);

// Initialize lineCharts
const [chartTemp, chartPressure, chartHeight, chartAcceleration] = lineCharts();

// Initialize d3 gps visualization
GPS();

// Initialize openStreetMap visualization
const [map, marker1, marker2] = openStreetMap();




socket.on('connect', () => { console.log("connected_GUI") });


socket.on('sensorData', (data) => { //As a temp data is received
  console.log(data);
  console.log("above is data");

  updateLineCharts(data, chartTemp, chartPressure, chartHeight, chartAcceleration);
  updateMap(map, marker1, marker2, data);

});
