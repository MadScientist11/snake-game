import { io } from "socket.io-client";
import { RenderService } from "./render-service.js";
import '../src/styles.css'
import * as constants from 'shared/constants.js'
import { GAME_SCREEN, MAIN_MENU_SCREEN, WindowManager } from "./window-manager.js";
import {HttpService} from "./http-service.js";


const renderService = new RenderService();
const httpService = new HttpService();
const windowManager = new WindowManager(httpService);

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

let playerId = -1;
export let roomId;

let socket;

export function newGame() {
    initGame();
    socket.emit('newGame');
}

export function joinGame(roomId) {
    initGame();
    socket.emit('joinGame', roomId)
}

function initGame() {

    renderService.initialize(CANVAS_WIDTH, CANVAS_HEIGHT);

    socket = io('');

    socket.on("connect", () => {
        console.log(socket.id);
    });

    socket.on("disconnect", () => {
        console.log(socket.id);

        windowManager.openScreen(MAIN_MENU_SCREEN);
    });

    socket.on('initPlayer', (arg1, arg2) => {
        playerId = arg1;
        roomId = arg2;
        console.log(arg2)
        windowManager.openScreen(GAME_SCREEN);
    });

    socket.on('gameState', (gameState) => {
        let state = JSON.parse(gameState);
            requestAnimationFrame(() => drawWorld(state, playerId))
    })


    document.addEventListener('keydown', keydown);

    function keydown(e) {
        socket.emit('keydown', e.keyCode, playerId)
    }
}

function drawWorld(gameState, playerId) {

    renderService.clearScreen();
    drawField();

    for (const playerState of gameState.players) {
        drawPlayer(playerState);
    }

    drawFood(gameState);

    drawScore(gameState.players[playerId]);

}

function drawScore(playerState) {

    renderService.drawText(`Score: ${playerState.score}`, {x: 470, y: 40 }, 'white');
}

function drawFood(gameState) {
    let cellSize = CANVAS_WIDTH / constants.GRID_SIZE;
    let food = gameState.food;

    if(!food)
        return;

    renderService.drawRect(
        { x: food.x * cellSize, y: food.y * cellSize },
        {x: cellSize, y: cellSize },
        'red');
}

function drawPlayer(playerState) {
    let cellSize = CANVAS_WIDTH / constants.GRID_SIZE;
    for (let bodyPart of playerState.body) {
        renderService.drawRect(
            { x: bodyPart.x * cellSize, y: bodyPart.y * cellSize },
            {x: cellSize, y: cellSize },
            'green')
    }
}

function drawField() {
    renderService.drawRect({ x: 0, y: 0 }, {x: CANVAS_WIDTH, y: CANVAS_HEIGHT });
}

windowManager.initialize();
windowManager.openScreen(MAIN_MENU_SCREEN);

