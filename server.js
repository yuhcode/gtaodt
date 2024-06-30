const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8443, host: '192.168.188.199' });

const clients = new Map();

server.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    const nickname = `Anonymous${Math.floor(Math.random() * 10000)}`;
    clients.set(ws, { ip, nickname });

    ws.on('message', (message) => {
        const { nickname } = clients.get(ws);
        console.log(`${nickname} (${ip}): ${message}`);
        if (message === '/server') {
            sendServerMessage(ws);
        } else {
            broadcast(`${nickname}: ${message}`);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

function broadcast(message) {
    clients.forEach((client, ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

function sendServerMessage(ws) {
    const serverMessage = 'ODT Chat SRV: Hello from the server!';
    ws.send(serverMessage);
}

console.log('WebSocket server is running on ws://192.168.188.199:8443');
