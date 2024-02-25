export class SystemsGroup {

    constructor() {
        this.registeredObjects = new Set();
    }
    register(obj) {
        this.registeredObjects.add(obj);
        return this;
    }

    unregister(obj) {
        this.registeredObjects.delete(obj);
    }

    initialize() {
        for (const obj of this.registeredObjects) {
            if (typeof obj.onInit === 'function') {
                obj.onInit();
            }
        }
    }

    onTick(delta) {
        for (const obj of this.registeredObjects) {
            if (typeof obj.onTick === 'function') {
                obj.onTick(delta);
            }
        }
    }

}