import {Controller} from "@waltz-controls/middleware";
import PiControllerClient from "transport/pi_controller_client";
import PiMotor from "models/pi_motor";

export const kPiAxisControllerCtx = "controllers";
export const kPiAxisController = "controller:pi"

export default class PiAxisController extends Controller {
    constructor(app, controller) {
        super(kPiAxisController, app);
        this.controller = controller;
    }

    run() {

    }

    /**
     *
     * @returns {Promise<PiController>}
     */
    initialize() {
        const client = new PiControllerClient(this.controller);
        return Promise.all([
            client.version(),
            client.position(),
            client.servo(),
            client.reference()
        ])
            .then(resp => {
                this.controller.version = resp[0].version;
                this.controller.motors.clearAll();
                this.controller.motors.parse(
                    Object.keys(resp[1]).map(key => new PiMotor(key, resp[1][key], resp[2][key], resp[3][key]))
                )
                return this.controller;
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    toggleServo(values) {
        const client = new PiControllerClient(this.controller);
        client
            .toggleServo(values)
            .then(resp => {
                return client.servo();
            })
            .then(resp => {
                debugger
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }
}