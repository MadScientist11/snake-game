import * as Constants from 'shared/constants.js';
import {vec2Equal} from "../../utils.js";

export class CheckBoundsSystem {

    constructor(gameState) {
        this.gameState = gameState;
    }

    onTick(delta) {
        for (let i = 0; i < this.gameState.players.length; i++) {

            const playerState = this.gameState.players[i];

            if(vec2Equal(playerState.velocity, {x: 0, y: 0})) {
                continue;
            }

            let velocity = playerState.velocity ? playerState.velocity : {x: 0, y: 0 };

            let targetPosition = {x: playerState.position.x + velocity.x, y: playerState.position.y + velocity.y }

            if(targetPosition.x < 0 || targetPosition.x > Constants.GRID_SIZE - 1 || targetPosition.y < 0 || targetPosition.y > Constants.GRID_SIZE - 1) {
                playerState.isDead = true;
            }

            for (let i = 0; i < playerState.body.length - 1; i++) {
                if(vec2Equal(playerState.body[i], playerState.position)) {
                    playerState.isDead = true;
                }
            }
        }
    }
}