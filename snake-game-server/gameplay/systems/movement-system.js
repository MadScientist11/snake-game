import {VEC2_ZERO, vec2Equal} from "../../utils.js";

export class MovementSystem {

    constructor(gameState) {
        this.gameState = gameState;
    }

    onTick(delta) {
        for (let i = 0; i < this.gameState.players.length; i++) {

            const playerState = this.gameState.players[i]

            if(playerState.isDead || vec2Equal(playerState.velocity, VEC2_ZERO)) {
                continue;
            }

            playerState.position.x += playerState.velocity.x;
            playerState.position.y += playerState.velocity.y;

            playerState.body.push({ ...playerState.position })
            playerState.body.shift()
        }
    }
}
