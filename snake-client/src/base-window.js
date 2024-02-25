export class BaseWindow {
    constructor(windowManager, screenElement) {
        this.windowManager = windowManager;
        this.screenElement = screenElement;
    }

    onShow() {

    }

    onHide() {

    }

    show() {
        this.screenElement.classList.add('active');
        this.onShow();
    }

    hide()  {
        this.screenElement.classList.remove('active');
        this.onHide();
    }
}