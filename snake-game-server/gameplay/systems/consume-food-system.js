import {vec2Equal} from "../../utils.js";

export class FoodConsumptionSystem {
    constructor(gameState) {
        this.gameState = gameState;
    }

    onTick(delta) {

        if(!this.gameState.food)
        {
            return;
        }

        for (let i = 0; i < this.gameState.players.length; i++) {

            const playerState = this.gameState.players[i]

            if(vec2Equal(playerState.position, this.gameState.food)) {

                let last = playerState.body[0];
                let preLast = playerState.body[1];

                let newPartDirection = { x: last.x - preLast.x, y: last.y - preLast.y };

                let newPart = {x: last.x + newPartDirection.x, y: last.y + newPartDirection.y};
                playerState.body.unshift({...newPart});
                this.gameState.food = null;
                playerState.score++;
            }

        }
    }
}