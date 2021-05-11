var socket = io.connect('http://localhost:4000'); //connect to server

var tempChart = document.getElementById('tempChart').getContext('2d');
var chartTemp = new Chart(tempChart, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: "Temperature",
            borderColor: "#FF5733",
            data: [],
            fill: false,
            pointStyle: 'circle',
            backgroundColor: '#3498DB',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0,
        }]
    },
    // Configuration options go here
    options: {}

});

var pressChart = document.getElementById('pressChart').getContext('2d');
var chartPressure = new Chart(pressChart, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: "Pressure",
            borderColor: "#FF5733",
            data: [],
            fill: false,
            pointStyle: 'circle',
            backgroundColor: '#3498DB',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0,
        }]
    },
    // Configuration options go here
    options: {}

});

socket.on('connect', () => { console.log("connected_GUI") })


socket.on('temperature', (data) => { //As a temp data is received
    console.log("data_received on gui");
    console.log(data);
    document.getElementById('date').innerHTML = data.date; //update the date
    if (chartTemp.data.labels.length != 15) { //If we have less than 15 data points in the graph
        chartTemp.data.labels.push(data.time); //Add time in x-asix
        chartTemp.data.datasets.forEach((dataset) => {
            dataset.data.push(data['temp']); //Add temp in y-axis
        });
    } else { //If there are already 15 data points in the graph.
        chartTemp.data.labels.shift(); //Remove first time data
        chartTemp.data.labels.push(data.time); //Insert latest time data
        chartTemp.data.datasets.forEach((dataset) => {
            dataset.data.shift(); //Remove first temp data
            dataset.data.push(data['temp']); //Insert latest temp data
        });
    }
    chartTemp.update(); //Update the graph.
});

socket.on('pressure', (data) => { //As a temp data is received
    console.log("data_received on gui");
    document.getElementById('date').innerHTML = data.date; //update the date
    if (chartTemp.data.labels.length != 15) { //If we have less than 15 data points in the graph
        chartPressure.data.labels.push(data.time); //Add time in x-asix
        chartPressure.data.datasets.forEach((dataset) => {
            dataset.data.push(data['pressure']); //Add temp in y-axis
        });
    } else { //If there are already 15 data points in the graph.
        chartPressure.data.labels.shift(); //Remove first time data
        chartPressure.data.labels.push(data.time); //Insert latest time data
        chartPressure.data.datasets.forEach((dataset) => {
            dataset.data.shift(); //Remove first temp data
            dataset.data.push(data['pressure']); //Insert latest temp data
        });
    }
    chartPressure.update(); //Update the graph.
});