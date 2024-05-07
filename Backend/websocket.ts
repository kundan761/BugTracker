import { Server } from 'socket.io';
import { createServer } from 'http';

export const initWebSocket = () => {
    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for chat messages
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            // Broadcast the message to all connected clients
            io.emit('chat message', msg);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    httpServer.listen(4000, () => {
        console.log('WebSocket server listening on *:4000');
    });
};
