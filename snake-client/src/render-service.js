export class RenderService {

    initialize(canvasWidth, canvasHeight) {

        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;

        const gameCanvas = document.getElementById('canvas1');
        this.context = gameCanvas.getContext('2d');

        gameCanvas.width = this.canvasWidth;
        gameCanvas.height = this.canvasHeight;

        const root = document.documentElement;

        root.style.setProperty('--canvas-width', this.canvasWidth);
        root.style.setProperty('--canvas-height', this.canvasHeight);
    }

    drawRect(position, size, color) {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(position.x, position.y, size.x, size.y);
        this.context.restore();

    }

    drawText(text, position, color, font = "30px Arial") {
        this.context.save();

        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, position.x, position.y);

        this.context.restore();
    }

    clearScreen() {
        this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    }


}