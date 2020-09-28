export default class PiController {
    constructor(id, host, port = 50000) {
        this.id = id;
        this.ip = host;
        this.port = port;
        this.version = undefined;
        this.motors = new webix.DataCollection();
    }
}