import {endGame} from "../../server.js";

export class DeathSystem {

    constructor(gameState) {
        this.gameState = gameState;

    }

    onTick(delta) {

        if(this.gameState.players.some(player => player.isDead)) {
            endGame(this.gameState.roomId);

        }
    }
}