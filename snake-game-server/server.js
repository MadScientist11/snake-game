import { HttpService } from "./infrastructure/services/http-service.js";
import { SocketService } from "./infrastructure/services/socket-service.js";
import {DbService} from "./infrastructure/services/db-service.js";
import {Game} from "./gameplay/game.js";
import {RoomService} from "./infrastructure/services/room-service.js";
import { PlayerState } from "shared/game-state.js";


const port = process.env.PORT || 3000;

const dbService = new DbService();
const httpService = new HttpService(dbService);
const socketService = new SocketService(httpService);
const roomService = new RoomService(socketService);

httpService.initialize(port);
socketService.initialize();
await dbService.initialize();



export class RoomState {
    constructor() {
        this.connectedClients = [];
        this.gameState = null;
    }
}

let game;

socketService.on('connection', async clientConnection => {

    clientConnection.on('newGame', newGame)
    clientConnection.on('joinGame', joinGame)


    function newGame() {
        const roomState = roomService.createRoom(clientConnection);
    }

    function joinGame(roomId) {
        roomService.joinRoom(roomId, clientConnection)
            .then(() => {
                const roomState = roomService.roomsById.get(roomId);
                startGame(roomState.gameState);
            })
    }
});

export function createPlayer(playerIndex) {
    const playerState = new PlayerState();

    if(playerIndex === 0) {
        playerState.position ={ x: 10, y: 10 };
        playerState.body = [
            {x: 10, y: 12},
            {x: 10, y: 11},
            { x: 10, y: 10 },
        ]
    }
    else {
        playerState.position ={ x: 7, y: 10 };
        playerState.body = [
            {x: 7, y: 12},
            {x: 7, y: 11},
            { x: 7, y: 10 },
        ]
    }

    return playerState;
}

async function startGame(gameState) {

    game = new Game(3, roomService);

    await game.initialize(gameState);
    game.startTick();
}

export async function endGame(roomId) {

    let room = roomService.roomsById.get(roomId);
    const playerState = room.gameState.players[0];
    dbService
        .insertScore({nickname: playerState.nickname, date: new Date().toUTCString(), score: playerState.score})

    game.tearDown();
    game = null;

    socketService.disconnectRoom(roomId);

}










