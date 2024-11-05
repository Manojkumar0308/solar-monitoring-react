import { io } from "socket.io-client";

const socket = io('http://localhost:5173', { autoConnect: false }); 
// When the client connects to the server
socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

// Handle the 'login' event emitted from the server
socket.on('login', (data) => {
    console.log(`Login event received: ${JSON.stringify(data)}`);
});

export default socket;
