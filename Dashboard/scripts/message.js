export function messageSetup(socket, port) {
  socket.on("prelaunchReady", (ready) => {
    port.write('prelaunch\n', (err) => {
      if (err) {
        return console.log('prelaunch message error on write: ', err.message);
      }
      console.log('prelaunch message sent');
    });
  });

  socket.on("launchReady", (ready) => {
    port.write('launch\n', (err) => {
      if (err) {
        return console.log('launch message error on write: ', err.message);
      }
      console.log('launch message sent');
    });
  });

  socket.on("endFlight", (ready) => {
    port.write('end\n', (err) => {
      if (err) {
        return console.log('end message error on write: ', err.message);
      }
      console.log('end message sent');
    });
  });

  socket.on("resetSoftware", (ready) => {
    port.write('reset\n', (err) => {
      if (err) {
        return console.log('software reset message error on write: ', err.message);
      }
      console.log('reset message sent');
    });
  });

  socket.on("testReady", (ready) => {
    port.write('test\n', (err) => {
      if (err) {
        return console.log('test message error on write: ', err.message);
      }
      console.log('test message sent');
    });
  });

  socket.on("drogueShoot", (ready) => {
    port.write('drogue\n', (err) => {
      if (err) {
        return console.log('drogue message error on write: ', err.message);
      }
      console.log('drogue message sent');
    });
  });

  socket.on("mainShoot", (ready) => {
    port.write('main\n', (err) => {
      if (err) {
        return console.log('main message error on write: ', err.message);
      }
      console.log('main message sent');
    });
  });
}