export const chartConfig = {
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
            pointRadius: 0,
            pointHoverRadius: 7,
            lineTension: 0,
        }]
    },
    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false ,
                    color: "#FFFFFF"
                  }
                }],
            yAxes: [{
                ticks: {
                    min: 0, // it is for ignoring negative step.
                    // beginAtZero: true,
                    callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                },
                gridLines: {
                    display: false ,
                    color: "#FFFFFF"
                  }
            }]
        },
        // animation: {
        //     duration: 0.05
        // }
    }
}


export const xyzChartConfig = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        interaction: {
            mode: 'nearest',
        },
        labels: [...Array(15).keys()].map(function (value) {
            return value - 14;
        }),
        datasets: [{
            label: "x",
            data: [...Array(15)],
            borderColor: '#DE0000',
            fill: false,
            // pointStyle: 'circle',
            backgroundColor: '#DE0000',
            pointRadius: 0,
            pointHoverRadius: 7,
            lineTension: 0,
        }, {
            label: "y",
            data: [...Array(15)],
            borderColor: 'rgb(255, 205, 86)',
            fill: false,
            // pointStyle: 'circle',
            backgroundColor: 'rgb(255, 205, 86)',
            pointRadius: 0,
            pointHoverRadius: 7,
            lineTension: 0,
        }, {
            label: "z",
            data: [...Array(15)],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            // pointStyle: 'circle',
            backgroundColor: 'rgb(75, 192, 192)',
            pointRadius: 0,
            pointHoverRadius: 7,
            lineTension: 0,
        }]
    },
    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false ,
                    color: "#FFFFFF"
                  },
            //         display: true,
            //         scaleLabel: {
            //             display: true,
            //             labelString: 'Month'
            //         }
                }],
            yAxes: [{gridLines: {
                display: false ,
                color: "#FFFFFF"
              },
                display: true,
                ticks: {

                    steps: 10,
                    stepValue: 5,
                    max: 10,
                    min: -10
                }
            }]
        }
    }

}