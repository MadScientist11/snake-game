import {BaseWindow} from "./base-window.js";
import {GAME_SCREEN} from "./window-manager.js";
import {roomId} from "./index.js";

export class GameWindow extends BaseWindow {
    constructor(windowManager) {

        const gameScreen = document.getElementById(GAME_SCREEN);

        super(windowManager, gameScreen);

        this.gameCodeDisplay = document.getElementById('gameCodeDisplay');
    }

    onShow() {
        super.onShow();
        console.log(roomId)
        this.gameCodeDisplay.textContent = roomId;
    }


}