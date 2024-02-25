export class MovementInputSystem {

    constructor(gameState, roomService) {
        this.gameState = gameState;
        this.roomService = roomService;

        this.queuedVelocity = [];
    }

    onInit() {
        const roomState = this.roomService.roomsById.get(this.gameState.roomId);

        for (let i = 0; i < roomState.connectedClients.length; i++) {
            const client = roomState.connectedClients[i];
            client.on('keydown', (keyCode) => this.onMovementInput(keyCode, i));
        }
    }

    onTick(delta) {

        for (let i = 0; i < this.gameState.players.length; i++) {

            if(this.queuedVelocity[i]) {
                const playerState = this.gameState.players[i];
                playerState.velocity = this.queuedVelocity[i];


            }
        }
    }

    onMovementInput(keyCode, playerId) {
        const velocity = this.readVelocity(keyCode);
        const playerState = this.gameState.players[playerId];


        if(velocity) {

            if(this.oppositeVelocity([playerState.velocity.x, playerState.velocity.y], [velocity.x, velocity.y]))
                return;

            this.queuedVelocity[playerId] = velocity;
        }
    }

    oppositeVelocity(vec1, vec2) {
       return this.dot(vec1, vec2) === -1;
    }

    readVelocity(keyCode) {
        switch(keyCode) {
            case 37: {
                return { x: -1, y: 0 };
            }
            case 38: {
                return { x: 0, y: -1 };
            }
            case 39: {
                return { x: 1, y: 0 };
            }
            case 40: {
                return { x: 0, y: 1 };
            }
        }
    }

    dot(vec1, vec2) {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1];
    }
}
