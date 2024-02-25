import {BaseWindow} from "./base-window.js";
import {GAME_CREATION_SCREEN, GAME_SCREEN} from "./window-manager.js";
import {initGame, joinGame, newGame} from "./index.js";

export class CreateGameWindow extends BaseWindow {

    constructor(windowManager) {

        const createGameScreen = document.getElementById(GAME_CREATION_SCREEN);
        super(windowManager, createGameScreen);


        const newGameBtn = document.getElementById('newGameButton');
        const joinGameBtn = document.getElementById('joinGameButton');
        this.gameCodeInput = document.getElementById('gameCodeInput');

        newGameBtn.addEventListener('click', this.onNewGame.bind(this));
        joinGameBtn.addEventListener('click', this.onJoinGame.bind(this));

    }

    onNewGame() {
        newGame();
    }

    onJoinGame() {
        joinGame(this.gameCodeInput.value);
    }
}