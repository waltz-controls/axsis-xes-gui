import {Controller} from "@waltz-controls/middleware";
import PiControllerClient from "transport/pi_controller_client";

export const kPiAxisControllerCtx = "controllers";
export const kPiAxisController = "controller:pi"
export const kPiAxisUpdateMotor = "controller:pi:updateMotor";
export const kPiAxisStop = "controller:pi:stop";
export const kPiAxisControllerDo = "controller:pi:do";
export const kPiAxisControllerDone = "controller:pi:done";

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
        this.dispatch(`Initializing controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
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
            .then(controller => {
                this.dispatch(`Initializing controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
                return controller;
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    toggleServo(values) {
        this.dispatch(`Toggling Servo mode on controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
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
                this.dispatch(`Toggling Servo mode on controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    move(values) {
        this.dispatch(`Moving controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
        const client = new PiControllerClient(this.controller);
        client
            .move(values)
            .then(resp => {
                Object.keys(values).forEach(key => {
                    if (resp[key] === values[key])
                        this.controller.motors.updateItem(key, {position: resp[key]});
                    else
                        this.dispatchError(new Error(`Failed to move motor ${key} in controller ${this.controller.ip} from ${resp[key]} to ${values[key]}`))

                })
                this.dispatch(`Moving controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    home(values) {
        this.dispatch(`Referencing controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
        const client = new PiControllerClient(this.controller);
        client
            .home(values)
            .then(resp => {
                if (values)
                    values.forEach(key => {
                        this.controller.motors.updateItem(key, {position: resp[key]});
                    })

                this.dispatch(`Referencing controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    position() {
        this.dispatch(`Reading position on controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
        const client = new PiControllerClient(this.controller);
        client
            .position()
            .then(resp => {
                Object.keys(resp).forEach(key => {
                    this.controller.motors.updateItem(key, {position: resp[key]});
                })
                this.dispatch(`Reading position on controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
            })
            .catch(err => {
                this.dispatchError(err);
                throw err;//abort Promise
            })
    }

    stop() {
        this.dispatch(`Stopping controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
        const client = new PiControllerClient(this.controller);
        client
            .stop()
            .then(resp => {
                this.dispatch(`Stopping controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
                this.dispatch(`Controller ${this.controller.ip} has been stopped`, kPiAxisStop);
            })
            .catch(err => {
                this.dispatch(`Stopping controller ${this.controller.ip}...`, kPiAxisControllerDone, kPiAxisController);
                this.dispatch(`Controller ${this.controller.ip} has been stopped`, kPiAxisStop);//STP cmd raises exception
            })
    }
}