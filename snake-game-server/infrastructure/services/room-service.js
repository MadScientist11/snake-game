import {createPlayer, RoomState} from "../../server.js";
import { GameState } from "shared/game-state.js";

export class RoomService {
    constructor(socketService) {
        this.socketService = socketService;
        this.roomsById = new Map();
    }

    createRoom(client) {
        const roomId = this.makeId(5);
        const roomState = new RoomState();
        roomState.connectedClients.push(client);

        roomState.gameState = new GameState();
        const playerState = createPlayer(0);

        roomState.gameState.players.push(playerState);
        roomState.gameState.roomId = roomId;

        this.roomsById.set(roomId, roomState);

        client.join(roomId)

        console.log(`Room initialized ${roomId}`)
        client.emit('initPlayer', 0, roomId);

        return roomState;
    }

    async joinRoom(roomId, client) {

        let roomState = this.roomsById.get(roomId);
        const numClients = await this.socketService.getRoomClients(roomId);

        if(numClients === 0) {
            client.emit('unknownGame');
            return;
        }
        else if(client > 1) {
            client.emit('tooManyPlayers')
            return;
        }

        const newPlayer = createPlayer(1);
        roomState.connectedClients.push(client)
        roomState.gameState.players.push(newPlayer);

        client.join(roomId);

        client.emit('initPlayer', 1, roomId);
    }


    makeId(length) {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}