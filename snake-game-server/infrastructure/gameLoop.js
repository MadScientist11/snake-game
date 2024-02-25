export class GameLoop {

    constructor(fps = 60) {
        this.targetTickRate = 1000 / fps;
        this.loopIntervalId = null;
        this.stopped = false;
    }

    onTick(delta) { }

    startTick() {

        this.loopIntervalId = setInterval(this.onTick.bind(this), this.targetTickRate)

    }

    clearScheduledTick() {
        clearInterval(this.loopIntervalId);
    }
}