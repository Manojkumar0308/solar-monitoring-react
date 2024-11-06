// src/services/socket.js
import { io } from 'socket.io-client';

let socket;

export const initiateSocketConnection = () => {
  socket = io('http://localhost:3000'); // Your server URL

  // This event is triggered when the client successfully connects to the server
  socket.on('connect', () => {
    console.log(`Connected to server with socket ID: ${socket.id}`);
  });
};

export const emitLoginEvent = (userDetails) => {
  if (socket) {
    // Emit the login event with the user details and socket ID
    socket.emit('login', { ...userDetails, socketId: socket.id });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

export default socket;
