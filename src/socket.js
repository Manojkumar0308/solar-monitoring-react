// socket.js
import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  console.log('Initializing socket connection...');
  if (!socket) {
    socket = io('http://localhost:3000', {
      
    });
    console.log('Socket connection established:', socket);
    socket.on('connect', () => console.log(`Connected with ID: ${socket.id}`));
    socket.on('disconnect', () => console.log(`user disconnected`));
    socket.on('error', (error) => console.log('Socket error:', error));
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


