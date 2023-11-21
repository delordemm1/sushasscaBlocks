// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on("action", (arg) => {
          io.emit('eventFromServer', arg)
        })
    })
}