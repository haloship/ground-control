var socket = io.connect('http://localhost:4000'); //connect to server



const chartConfig = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [...Array(15).keys()].map(function (value) {
            return value - 14;
        }),
        datasets: [{
            label: "Pressure",
            data: [...Array(15)],
            borderColor: "#FF5733",
            fill: false,
            pointStyle: 'circle',
            backgroundColor: '#3498DB',
            pointRadius: 3,
            pointHoverRadius: 7,
            lineTension: 0,
        }]
    },
    // Configuration options go here
    options: {}

}

// document.getElementById("rawTelemetry").innerHTML =
//     "
//         < p > hello < p >
//         "

var tempChart = document.getElementById('tempChart').getContext('2d');
tempChartConfig = JSON.parse(JSON.stringify(chartConfig))
tempChartConfig.data.datasets[0].label = "Temperature";
var chartTemp = new Chart(tempChart, tempChartConfig);

var pressChart = document.getElementById('pressChart').getContext('2d');
pressureChartConfig = JSON.parse(JSON.stringify(chartConfig))
pressureChartConfig.data.datasets[0].label = "Pressure";
var chartPressure = new Chart(pressChart, pressureChartConfig);

var heightChart = document.getElementById('heightChart').getContext('2d');
heightChartConfig = JSON.parse(JSON.stringify(chartConfig))
heightChartConfig.data.datasets[0].label = "Height";
var chartHeight = new Chart(heightChart, heightChartConfig);

var longChart = document.getElementById('longChart').getContext('2d');
longChartConfig = JSON.parse(JSON.stringify(chartConfig))
longChartConfig.data.datasets[0].label = "Longitude";
var chartLong = new Chart(longChart, longChartConfig);

var latChart = document.getElementById('latChart').getContext('2d');
latChartConfig = JSON.parse(JSON.stringify(chartConfig))
latChartConfig.data.datasets[0].label = "Latitude";
var chartLat = new Chart(latChart, latChartConfig);

socket.on('connect', () => { console.log("connected_GUI") })


socket.on('temperature', (data) => { //As a temp data is received
    console.log(data)
    console.log("above is data")

    chartTemp.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Temperature); //Insert latest temp data
    });
    chartTemp.update(); //Update the graph.

    chartPressure.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Pressure); //Insert latest temp data
    });
    chartPressure.update(); //Update the graph.

    document.getElementById('date').innerHTML = data.date; //update the date
    chartHeight.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.HeightAboveMSL); //Insert latest temp data
    });
    chartHeight.update(); //Update the graph.

    chartLong.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Longitude); //Insert latest temp data
    });
    chartLong.update(); //Update the graph.

    chartLat.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Latitude); //Insert latest temp data
    });
    chartLat.update(); //Update the graph.

    var today = new Date();
    var date = today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear();


    document.getElementById('date').innerHTML = date; //update the date


});
