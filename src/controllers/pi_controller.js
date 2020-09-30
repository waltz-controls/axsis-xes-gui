import {Controller} from "@waltz-controls/middleware";
import PiControllerClient from "transport/pi_controller_client";

export const kPiAxisControllerCtx = "controllers";
export const kPiAxisController = "controller:pi"
export const kPiAxisUpdateMotor = "controller:pi:updateMotor";
export const kPiAxisStop = "controller:pi:stop";

export default class PiAxisController extends Controller {
    constructor(app, controller) {
        super(`${controller.id}`, app);
        this.controller = controller;

        controller.motors.attachEvent("onDataUpdate",
            (id, updated, old) => {
                this.dispatch({
                    controllerId: controller.id,
                    ...updated
                }, kPiAxisUpdateMotor, kPiAxisController)
            }
        )
    }

    run() {

    }

    /**
     *
     * @returns {Promise<PiController>}
     */
    initialize() {
        const client = new PiControllerClient(this.controller);
        return client.version()
            .then(resp => {
                this.controller.version = resp.version;
                return client.position();
            })
            .then(resp => {
                this.controller.motors.clearAll();
                this.controller.motors.parse(
                    Object.keys(resp).map(id => ({
                        id,
                        position: resp[id]
                    }))
                )
                return client.servo();
            })
            .then(resp => {
                this.controller.motors.parse(
                    Object.keys(resp).map(id => ({
                        id,
                        servo: resp[id]
                    }))
                )
                return client.reference();
            })
            .then(resp => {
                this.controller.motors.parse(
                    Object.keys(resp).map(id => ({
                        id,
                        reference: resp[id]
                    }))
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
                Object.keys(values).forEach(key => {
                    if (resp[key] === values[key])
                        this.controller.motors.updateItem(key, {servo: resp[key]});
                    else
                        this.dispatchError(new Error(`Failed to toggle Servo for motor ${key} in controller ${this.controller.ip}`))

                })
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    move(values) {
        const client = new PiControllerClient(this.controller);
        client
            .move(values)
            .then(resp => {
                Object.keys(values).forEach(key => {
                    if (resp[key] === values[key])
                        this.controller.motors.updateItem(key, {servo: resp[key]});
                    else
                        this.dispatchError(new Error(`Failed to toggle Servo for motor ${key} in controller ${this.controller.ip}`))

                })
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    stop() {
        const client = new PiControllerClient(this.controller);
        client
            .stop()
            .then(resp => {
                this.dispatch(`Controller ${this.controller.ip} has been stopped`, kPiAxisStop);
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }
}