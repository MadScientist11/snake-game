import {GameLoop} from "../infrastructure/gameLoop.js";
import {SystemsGroup} from "../infrastructure/systems-group.js";
import {MovementInputSystem} from "./systems/move-input-system.js";
import {MovementSystem} from "./systems/movement-system.js";
import {SendGameStateSystem} from "./systems/send-state-system.js";
import {FoodSpawnSystem} from "./systems/food-spawn-system.js";
import {FoodConsumptionSystem} from "./systems/consume-food-system.js";
import {CheckBoundsSystem} from "./systems/check-bounds-system.js";
import {DeathSystem} from "./systems/death-system.js";

export class Game extends GameLoop {

    constructor(fps, roomService) {
        super(fps);
        this.roomService = roomService;
    }

    async initialize(gameState) {

        this.gameState = gameState;
        this.systems = new SystemsGroup();

        this.systems
            .register(new MovementInputSystem(this.gameState, this.roomService))
            .register(new CheckBoundsSystem(this.gameState))
            .register(new MovementSystem(this.gameState))
            .register(new FoodSpawnSystem(this.gameState))
            .register(new FoodConsumptionSystem(this.gameState))
            .register(new SendGameStateSystem(this.gameState, this.roomService))
            .register(new DeathSystem(this.gameState))
            ;


        // clientConnection.on('keydown', this.onKeydown.bind(this))
        this.systems.initialize();
    }

    onTick(delta) {
        if(!this.gameState.isPaused)
            this.systems.onTick(delta);
    }


    tearDown() {
        this.clearScheduledTick();
        this.gameState = null;
        this.systems = null;
    }

    // onKeydown(keycode) {
    //
    //     if(keycode === 32)
    //         this.gameState.isPaused = !this.gameState.isPaused;
    // }
}
