
export class GameState {
    constructor() {
        this.roomId = null;
        this.players = [];
        this.food = { x: 7, y: 15 };
        this.isPaused = false;


    }
}

export class PlayerState {
    constructor() {
        this.nickname = "Kyouma";
        this.position = { x: 10, y: 10 }
        this.velocity = { x: 0, y: 0 }
        this.body = [
            {x: 12, y: 10},
            {x: 11, y: 10},
            { x: 10, y: 10 },
        ]
        this.isDead = false;
        this.score = 0;
    }
}