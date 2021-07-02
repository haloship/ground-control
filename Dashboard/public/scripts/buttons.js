export function buttonSetup(socket) {
  
  var launchButton = document.getElementById("prelaunchBtn");
  launchButton.onclick = function (event) {
    console.log(event);
    socket.emit("prelaunchReady", true);
  }

  var launchButton = document.getElementById("launchBtn");
  launchButton.onclick = function (event) {
    console.log(event);
    socket.emit("launchReady", true);
  }

  var endButton = document.getElementById("endBtn");
  endButton.onclick = function (event) {
    console.log(event);
    socket.emit("endFlight", true);
  }

  var resetButton = document.getElementById("resetBtn");
  resetButton.onclick = function (event) {
    console.log(event);
    socket.emit("resetSoftware", true);
  }

  var launchButton = document.getElementById("testBtn");
  launchButton.onclick = function (event) {
    console.log(event);
    socket.emit("testReady", true);
  }

  var endButton = document.getElementById("drogueBtn");
  endButton.onclick = function (event) {
    console.log(event);
    socket.emit("drogueShoot", true);
  }

  var resetButton = document.getElementById("mainBtn");
  resetButton.onclick = function (event) {
    console.log(event);
    socket.emit("mainShoot", true);
  }
}