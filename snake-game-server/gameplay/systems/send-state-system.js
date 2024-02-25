export class SendGameStateSystem {

    constructor(gameState, roomService) {
        this.gameState = gameState;
        this.roomService = roomService;
    }

    onTick(delta) {
        const roomState = this.roomService.roomsById.get(this.gameState.roomId);

        for (let i = 0; i < roomState.connectedClients.length; i++) {
            const client = roomState.connectedClients[i];
            client.emit('gameState', JSON.stringify(this.gameState))
        }
    }
}