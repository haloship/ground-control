import { chartConfig, xyzChartConfig } from "./scripts/chartConfigs.js"
import { GPS, openStreetMap } from "./scripts/gps.js"
import { lineCharts, updateLineCharts } from "./scripts/lineCharts.js";
import { buttonSetup } from "./scripts/buttons.js";
var socket = io.connect('http://localhost:4000'); //connect to server


// Setup Date
var today = new Date();
var date = today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear();
document.getElementById('date').innerHTML = date;

// State Control Button Setup
buttonSetup(socket);

// Initialize lineCharts
const [chartTemp, chartPressure, chartHeight, chartLong, chartLat, chartOrientation, chartAcceleration] = lineCharts();

// Initialize d3 gps visualization
GPS();

// Initialize openStreetMap visualization
openStreetMap();




socket.on('connect', () => { console.log("connected_GUI") })


socket.on('sensorData', (data) => { //As a temp data is received
  console.log(data)
  console.log("above is data")

  updateLineCharts(data, chartTemp, chartPressure, chartHeight, chartLong, chartLat, chartOrientation, chartAcceleration)

});
