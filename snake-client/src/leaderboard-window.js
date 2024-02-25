import {BaseWindow} from "./base-window.js";
import {LEADERBOARD_SCREEN, MAIN_MENU_SCREEN} from "./window-manager.js";

export class LeaderboardWindow extends BaseWindow {
    constructor(windowManager, httpService) {

        const leaderboardScreen = document.getElementById(LEADERBOARD_SCREEN);

        super(windowManager, leaderboardScreen);

        this.httpService = httpService;

        this.highScoreTable = document.getElementById('highscore-table');
        const exitButton = document.getElementById('leaderboard-exit-button');

        exitButton.addEventListener('click', this.onExit.bind(this))
    }

    async onShow() {
        super.onShow();
        const scores = await this.httpService.request('http://localhost:3000/scores');

        for (let i = 0; i < scores.length; i++) {
            let tableEntry = this.createEntry( {
                index: i,
                nickname: scores[i].nickname,
                date: scores[i].date,
                score: scores[i].score });
            this.highScoreTable.appendChild(tableEntry);
        }
    }

    onHide() {
        while (this.highScoreTable.children[2]) {
            this.highScoreTable.removeChild(this.highScoreTable.lastChild)
        }
    }


    onExit() {
        this.windowManager.openScreen(MAIN_MENU_SCREEN);
    }

    createEntry(data) {
        const { index, nickname, date, score } = data;

        const trElement = document.createElement('tr');
        console.log(date)

        const localDate = new Date(date);
        const rowData = [index, nickname, localDate.toLocaleDateString(), localDate.toLocaleTimeString(), score];

        rowData.forEach(data => {
            const tdElement = document.createElement('td');
            tdElement.textContent = data; // Set the text content of the <td> to the data value
            trElement.appendChild(tdElement); // Append the <td> to the <tr>
        });

       return trElement;
    }
}
