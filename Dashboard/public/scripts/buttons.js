export function buttonSetup(socket){
var element = document.getElementById("launchBtn");
element.onclick = function(event) {
  console.log(event);
  socket.emit("launchReady", true);
}}