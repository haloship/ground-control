
export function GPS() {
    var width = 400,
        height = 300,
        radius = Math.min(width, height) / 2 - 30;

    var data = [
        [0, 0.4]
    ]

    var y = _.map(data, _.last);
    var max = Math.max.apply(null, y);
    max = Math.ceil(max * 10) / 10;

    var angle = d3.scale.linear()
        .domain([0, 24])
        .range([0, 2 * Math.PI]);

    var r = d3.scale.linear()
        .domain([0, max])
        .range([0, radius]);

    var svg = d3.select("#gps").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var gr = svg.append("g")
        .attr("class", "r axis")
        .selectAll("g")
        .data(r.ticks(max * 10).slice(1))
        .enter().append("g");

    var ga = svg.append("g")
        .attr("class", "a axis")
        .selectAll("g")
        .data(d3.range(-90, 270, 45))
        .enter().append("g")
        .attr("transform", function (d) {
            return "rotate(" + d + ")";
        });

    var color = d3.scale.category20();

    var line = d3.svg.line.radial()
        .angle(function (d) {
            return angle(d[0]);
        })
        .radius(function (d) {
            return r(d[1]);
        });


    gr.append("circle")
        .attr("r", r);

    gr.append("text")
        .attr("y", function (d) { return -r(d) - 4; })
        .attr("transform", "rotate(20)")
        .style("text-anchor", "middle")
        .text(function (d) { return d; });

    ga.append("line")
        .attr("x2", radius);

    ga.append("text")
        .attr("x", radius + 6)
        .attr("dy", ".35em")
        .style("text-anchor", function (d) { return d < 270 && d > 90 ? "end" : null; })
        .attr("transform", function (d) {
            return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null;
        })
        .text(function (d, i) { return i * 3 + ":00" });

    svg.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("transform", function (d) {
            var coors = line([d]).slice(1).slice(0, -1);
            return "translate(" + coors + ")"
        })
        .attr("r", 8)
        .attr("fill", function (d, i) {
            return color(i);
        });
}

export function openStreetMap() {
    var element = document.getElementById('mapdiv');

    // Height has to be set. You can do this in CSS too.
    element.style = 'height:380px;';

    // Create Leaflet map on map element.
    var map = L.map(element);

    // Add OSM tile layer to the Leaflet map.
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // Add OSM tile layer to the Leaflet map.
    L.tileLayer('../maps/maps_la/{z}/{x}/{y}.png').addTo(map);

    // Target's GPS coordinates.
    var target = L.latLng(33.9166568, -118.333609);
    // var target = L.latLng(lat, lon);

    // Set map's center to target with zoom 14.
    // map.setView(target, 14);

    map.setView(target,14);

    // Place a marker on the same location.
    var marker_flight = L.marker(target).addTo(map);
    var marker_ground = L.marker(target).addTo(map);

    return [map, marker_flight, marker_ground];

}

export function updateMap(map, marker_flight, marker_ground, data) {
    // marker.setLatLong
    var newLatLng_flight = new L.LatLng(data.Latitude, data.Longitude);
    var newLatLng_ground = new L.LatLng(data.groundLatitude, data.groundLongitude);
    map.setView(newLatLng_flight);
    marker_flight.setLatLng(newLatLng_flight); 
    marker_ground.setLatLng(newLatLng_ground); 

    console.log("updating the Marker!")

    // if (theMarker != undefined) {
    //     map.removeLayer(theMarker);
    // };

    // //Add a marker to show where you clicked.
    // theMarker = L.marker([data.Latitude, data.Longitude]).addTo(map);

}