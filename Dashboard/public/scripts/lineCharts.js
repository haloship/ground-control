import { chartConfig, xyzChartConfig } from "./chartConfigs.js"

export function lineCharts() {
    var tempChart = document.getElementById('tempChart').getContext('2d');
    const tempChartConfig = JSON.parse(JSON.stringify(chartConfig))
    tempChartConfig.data.datasets[0].label = "Temperature";
    tempChartConfig.data.datasets[0].borderColor = '#DE0000';
    tempChartConfig.data.datasets[0].backgroundColor = '#DE0000';
    tempChartConfig.options.scales = {
        xAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            },
        }], yAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            }, display: true, ticks: { steps: 10, stepValue: 5, suggestedMax: 30, suggestedMin: 20 }
        }]
    }
    var chartTemp = new Chart(tempChart, tempChartConfig);

    var pressChart = document.getElementById('pressChart').getContext('2d');
    const pressureChartConfig = JSON.parse(JSON.stringify(chartConfig))
    pressureChartConfig.data.datasets[0].label = "Pressure";
    pressureChartConfig.data.datasets[0].borderColor = 'rgb(255, 205, 86)';
    pressureChartConfig.data.datasets[0].backgroundColor = 'rgb(255, 159, 64)';
    pressureChartConfig.options.scales = {
        xAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            },
        }], yAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            }, display: true, ticks: { steps: 10, stepValue: 5, suggestedMax: 1008, suggestedMin: 1007 }
        }]
    }
    var chartPressure = new Chart(pressChart, pressureChartConfig);

    var heightChart = document.getElementById('heightChart').getContext('2d');
    const heightChartConfig = JSON.parse(JSON.stringify(chartConfig))
    heightChartConfig.data.datasets[0].label = "Height";
    heightChartConfig.data.datasets[0].borderColor = 'rgb(75, 192, 192)';
    heightChartConfig.data.datasets[0].backgroundColor = 'rgb(75, 192, 192)';
    heightChartConfig.options.scales = {
        xAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            },
        }], yAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            }, display: true, ticks: { steps: 10, stepValue: 5, suggestedMax: 50, suggestedMin: 0 }
        }]
    }
    var chartHeight = new Chart(heightChart, heightChartConfig);

    var longChart = document.getElementById('longChart').getContext('2d');
    const longChartConfig = JSON.parse(JSON.stringify(chartConfig))
    longChartConfig.data.datasets[0].label = "Longitude";
    longChartConfig.data.datasets[0].borderColor = '#DE0000';
    longChartConfig.data.datasets[0].backgroundColor = '#DE0000';
    longChartConfig.options.scales = {
        xAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            },
        }], yAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            }, display: true, ticks: { steps: 10, stepValue: 5, suggestedMax: 140.136, suggestedMin: 140.135 }
        }]
    }
    var chartLong = new Chart(longChart, longChartConfig);

    var latChart = document.getElementById('latChart').getContext('2d');
    const latChartConfig = JSON.parse(JSON.stringify(chartConfig))
    latChartConfig.data.datasets[0].label = "Latitude";
    latChartConfig.data.datasets[0].borderColor = '#DE0000';
    latChartConfig.data.datasets[0].backgroundColor = '#DE0000';
    latChartConfig.options.scales = {
        xAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            },
        }], yAxes: [{
            gridLines: {
                display: false,
                color: "#FFFFFF"
            }, display: true, ticks: { steps: 10, stepValue: 5, suggestedMax: 35.717, suggestedMin: 35.716 }
        }]
    }
    var chartLat = new Chart(latChart, latChartConfig);

    var orientationChart = document.getElementById('orientationChart').getContext('2d');
    const orientationChartConfig = JSON.parse(JSON.stringify(xyzChartConfig))
    // latChartConfig.data.datasets[0].label = "Latitude";
    var chartOrientation = new Chart(orientationChart, orientationChartConfig);

    var accelerationChart = document.getElementById('accelerationChart').getContext('2d');
    const accelerationChartConfig = JSON.parse(JSON.stringify(xyzChartConfig))
    // latChartConfig.data.datasets[0].label = "Latitude";
    var chartAcceleration = new Chart(accelerationChart, accelerationChartConfig);

    return [chartTemp, chartPressure, chartHeight, chartLong, chartLat, chartOrientation, chartAcceleration]
}

export function updateLineCharts(data, chartTemp, chartPressure, chartHeight, chartLong, chartLat, chartOrientation, chartAcceleration) {
    document.getElementById("rawTemp").innerText = "Temperature: " + data.Temperature.toString() + " ℃"
    chartTemp.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Temperature); //Insert latest temp data
    });
    chartTemp.update(); //Update the graph.

    document.getElementById("rawPressure").innerText = "Pressure: " + data.Pressure.toString() + " hPa"
    chartPressure.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Pressure); //Insert latest temp data
    });
    chartPressure.update(); //Update the graph.

    document.getElementById("rawHeight").innerText = "Altitude: " + data.HeightAboveMSL.toString() + " mm"
    document.getElementById('date').innerHTML = data.date; //update the date
    chartHeight.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.HeightAboveMSL / 1000); //Insert latest temp data
    });
    chartHeight.update(); //Update the graph.

    document.getElementById("rawLong").innerText = "Longitude: " + data.Longitude.toString()
    chartLong.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Longitude / 10000000); //Insert latest temp data
    });
    chartLong.update(); //Update the graph.

    document.getElementById("rawLat").innerText = "Latitude: " + data.Latitude.toString()
    chartLat.data.datasets.forEach((dataset) => {
        dataset.data.shift(); //Remove first temp data
        dataset.data.push(data.Latitude / 10000000); //Insert latest temp data
    });
    chartLat.update(); //Update the graph.

    chartOrientation.data.datasets[0].data.shift();
    chartOrientation.data.datasets[0].data.push(data.xOrientation);
    chartOrientation.data.datasets[1].data.shift();
    chartOrientation.data.datasets[1].data.push(data.yOrientation);
    chartOrientation.data.datasets[2].data.shift();
    chartOrientation.data.datasets[2].data.push(data.zOrientation);
    console.log(chartOrientation.data.datasets[2]);
    chartOrientation.update(); //Update the graph.

    chartAcceleration.data.datasets[0].data.shift();
    chartAcceleration.data.datasets[0].data.push(data.xAcceleration);
    chartAcceleration.data.datasets[1].data.shift();
    chartAcceleration.data.datasets[1].data.push(data.yAcceleration);
    chartAcceleration.data.datasets[2].data.shift();
    chartAcceleration.data.datasets[2].data.push(data.zAcceleration);
    console.log(chartAcceleration.data.datasets[2]);
    chartAcceleration.update(); //Update the graph.
}