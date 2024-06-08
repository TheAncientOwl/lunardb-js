import { WebSocket } from 'ws';

const socket = new WebSocket('ws://localhost:8083');

socket.on('open', () => {
  console.log('Connected to the WebSocket server');

  const message = 'Hello from Node.js!';
  console.log('Sending:', message);
  socket.send(message);
});

socket.on('message', data => {
  console.log('Received:', data.toString());
});

socket.on('close', () => {
  console.log('Disconnected from the WebSocket server');
});

socket.on('error', err => {
  console.error('WebSocket error:', err);
});
