const WebSocket = require('ws');
const port = process.env.PORT || 8080; // Use Render's port or default to 8080
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`yay ws server is running on ws://localhost:${port}`);
