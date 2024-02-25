import { Server } from "socket.io";

export class SocketService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    initialize() {
        this.io = new Server(this.httpService.getServer(), { /* options */ });
    }

    on(eventId, handler) {
        this.io.on(eventId, handler);
    }

    disconnectRoom(roomId) {
        this.io.in(roomId).disconnectSockets(true);
    }


    async getRoomClients(roomId) {
       return await this.io.in(roomId).fetchSockets();
    }
}