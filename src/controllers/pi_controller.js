import {Controller} from "@waltz-controls/middleware";

export const kMotorController = "controller:pi"

export default class MotorController extends Controller {
    constructor(app) {
        super(kMotorController, app);
    }

    run(){

    }
}