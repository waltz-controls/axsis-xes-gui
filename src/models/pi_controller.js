export default class PiController {
    constructor(id, host, port=5000) {
        this.id = id;
        this.ip = host;
        this.port= port
        this.crystals = [];
    }
}