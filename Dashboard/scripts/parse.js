export function parsePacket(dataObj, sensordata) {
    var processedData = "";
    var rows = sensordata.split("\n");
    console.log(rows);
    // try{
    if (rows[0].split(":")[1] == 1) {
        dataObj["Time"] = rows[1];
        var firstPacket = rows[2].split(",");
        dataObj["Pressure"] = firstPacket[0];
        dataObj["Temperature"] = (isNaN(firstPacket[1])) ? dataObj["Temperature"] : firstPacket[1];
        dataObj["xAcceleration"] = (isNaN(firstPacket[2])) ? dataObj["xAcceleration"] : firstPacket[2];
        dataObj["yAcceleration"] = (isNaN(firstPacket[3])) ? dataObj["yAcceleration"] : firstPacket[3];
        dataObj["zAcceleration"] = (isNaN(firstPacket[4])) ? dataObj["zAcceleration"] : firstPacket[4];
        // dataObj["Temperature"] = firstPacket[1];
        // dataObj["xAcceleration"] = firstPacket[2];
        // dataObj["yAcceleration"] = firstPacket[3];
        // dataObj["zAcceleration"] = firstPacket[4];
        // dataObj["zAcceleration"] = (isNaN(firstPacket[4])) ? dataObj["zAcceleration"] : firstPacket[4];
        dataObj["Pressure"] = (dataObj["Pressure"] / 10);
        dataObj["Temperature"] = (dataObj["Temperature"] / 1000);
        dataObj["xAcceleration"] = (dataObj["xAcceleration"] / 1000);
        dataObj["yAcceleration"] = (dataObj["yAcceleration"] / 1000);
        dataObj["zAcceleration"] = (dataObj["zAcceleration"] / 1000);
        processedData = [rows[0], rows[1], dataObj["Pressure"], dataObj["Temperature"], dataObj["xAcceleration"], dataObj["yAcceleration"], dataObj["zAcceleration"]].join(",") + "\n";

    } else if (rows[0].split(":")[1] == 2) {
        // dataObj["Time"] = rows[1];
        // console.log("number 2 acket detected");
        var secondPacket = rows[1].split(",");
        dataObj["State"] = secondPacket[0];
        dataObj["HeightAboveMSL"] = secondPacket[1];
        dataObj["Latitude"] = secondPacket[2];
        dataObj["Longitude"] = secondPacket[3];
        dataObj["HeightAboveMSL"] = (dataObj["HeightAboveMSL"] / 1000);
        dataObj["Latitude"] = (dataObj["Latitude"] / 10000000);
        dataObj["Longitude"] = (dataObj["Longitude"].substring(0, 10) / 1000000);
        processedData = [rows[0], dataObj["State"], dataObj["HeightAboveMSL"], dataObj["Latitude"], dataObj["Longitude"]].join(",") + "\n";

    }else if (rows[0].split(":")[1] == 3) {
        // dataObj["Time"] = rows[1];
        // console.log("number 2 acket detected");
        var thirdPacket = rows[1].split(",");
        dataObj["groundLatitude"] = thirdPacket[0];
        dataObj["groundLongitude"] = thirdPacket[1];
        dataObj["groundLatitude"] = (dataObj["groundLatitude"] / 10000000);
        dataObj["groundLongitude"] = (dataObj["groundLongitude"] / 10000000);
        processedData = [rows[0], dataObj["groundLatitude"], dataObj["groundLongitude"]].join(",") + "\n";

    }
    // }catch{}
    dataObj["xOrientation"] = 1;
    dataObj["yOrientation"] = 2;
    dataObj["zOrientation"] = -1;
    dataObj["xGyro"] = 1;
    dataObj["yGyro"] = 2;
    dataObj["zGyro"] = -1;

    return processedData;

}