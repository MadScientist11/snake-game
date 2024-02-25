import * as Constants from 'shared/constants.js';
import { vec2Equal } from '../../utils.js';


export class FoodSpawnSystem {

    constructor(gameState) {
        this.gameState = gameState;
    }

    onTick(delta) {

        if(this.gameState.food) {
            return;
        }

        let randomPosition;
        do {
            randomPosition = { x: Math.floor(Math.random() * Constants.GRID_SIZE), y: Math.floor(Math.random() * Constants.GRID_SIZE) }
        }
        while(this.isOccupied(randomPosition))

        this.gameState.food = randomPosition;
    }

    isOccupied(position) {

        for (const player of this.gameState.players) {

            for (const bodyPart of player.body) {
                if(vec2Equal(bodyPart, position))
                    return true;
            }
        }

        if(vec2Equal(this.gameState.food, position))
            return true;


        return false;
    }
}