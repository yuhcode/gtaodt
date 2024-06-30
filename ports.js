const net = require('net');

function scanPorts() {
  for (let port = 1; port <= 65535; port++) {
    const socket = new net.Socket();
    socket.connect(port, '108.147.94.37', () => {
      console.log(`Port ${port} is open`);
      socket.destroy();
    });
    socket.on('error', () => {
      console.log(`Port ${port} is closed`);
    });
  }
}

scanPorts();
