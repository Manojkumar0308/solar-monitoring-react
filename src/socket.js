// socket.js
import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  // Create socket connection if not already connected
  if (!socket) {
    socket = io('http://localhost:3000');

    // Log connection status
    socket.on('connect', () => console.log(`Connected with ID: ${socket.id}`));
    socket.on('disconnect', () => console.log(`user disconnected`));
  }
  return socket;
};

// Get existing socket instance
export const getSocket = () => socket;

// Disconnect the socket
export const disconnectSocket = () => {
  const socketId = socket?.id;
  socket?.disconnect();
  console.log(`User disconnected with ID: ${socketId}`);
  socket = null;
};


