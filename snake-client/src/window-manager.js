import {MainMenuWindow} from "./main-menu-window.js";
import {GameWindow} from "./game-window.js";
import {LeaderboardWindow} from "./leaderboard-window.js";
import {CreateGameWindow} from "./create-game-window.js";

export const MAIN_MENU_SCREEN = "main-menu";
export const GAME_SCREEN = "game-screen";
export const LEADERBOARD_SCREEN = "leaderboard-screen";
export const GAME_CREATION_SCREEN = "create-game-screen";

export class WindowManager {

    constructor(httpService) {
        this.currentScreen = null;
        this.screens = new Map();

        this.httpService = httpService;
    }

    initialize() {

        this.screens.set(GAME_SCREEN, new GameWindow(this));
        this.screens.set(MAIN_MENU_SCREEN, new MainMenuWindow(this));
        this.screens.set(LEADERBOARD_SCREEN, new LeaderboardWindow(this, this.httpService));
        this.screens.set(GAME_CREATION_SCREEN, new CreateGameWindow(this));
    }

    openScreen(screenId) {

        if(!this.screens.has(screenId)) {
            console.error(`Screen with id ${screenId} doesn't exist!`);
            return;
        }

        const newScreen = this.screens.get(screenId);

        if(newScreen === this.currentScreen) {
            console.warn('The screen is already active!');
            return;
        }

        this.currentScreen?.hide();
        this.currentScreen = newScreen;
        this.currentScreen.show();
    }
    
}