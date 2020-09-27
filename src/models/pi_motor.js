export default class PiMotor {
    constructor(id, crystal) {
        this.id = id;
        this.crystal = crystal;
        this.position = undefined;
        this.servo = undefined;
        this.reference = undefined;
    }
}