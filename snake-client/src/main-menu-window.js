import {initGame} from "./index.js";
import {GAME_CREATION_SCREEN, GAME_SCREEN, LEADERBOARD_SCREEN, MAIN_MENU_SCREEN} from "./window-manager.js";
import {BaseWindow} from "./base-window.js";

export class MainMenuWindow extends BaseWindow {
    constructor(windowManager) {

        const mainMenuScreen = document.getElementById(MAIN_MENU_SCREEN);

        super(windowManager, mainMenuScreen);

        this.playButton = document.getElementById('play-button');
        this.leaderboardButton = document.getElementById('leaderboard-button');

        this.playButton.addEventListener('click', this.onPlayButtonClicked.bind(this));
        this.leaderboardButton.addEventListener('click', this.onLeaderboardClicked.bind(this));

    }

    onPlayButtonClicked() {
        this.windowManager.openScreen(GAME_CREATION_SCREEN);
    }

    onLeaderboardClicked() {
        this.windowManager.openScreen(LEADERBOARD_SCREEN);
    }

}