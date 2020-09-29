import {WaltzWidget} from "@waltz-controls/middleware";
import {getMotorIds} from "utils";

function createCrystalPanels(controller) {
    return [1, 2, 3, 4]
        .map(id => id + (controller.id * 4))
        .map(id => ({
            view: "datatable",
            columns: [
                {id: "id", header: `Crystal ${id}`, width: 150},
                {
                    id: "neg", header: "", width: 30, template() {
                        return `<span class="webix_icon negative mdi mdi-minus"></span>`
                    }
                },
                {id: "value", header: "Value", width: 120},
                {
                    id: "pos", header: "", template() {
                        return `<span class="webix_icon switcher mdi mdi-plus"></span>`
                    }, width: 30
                },
                //TODO link with outer collection
                {
                    id: "m1.position", header: "m1", width: 100, template(obj) {
                        return obj.motors[0].position
                    }
                },
                {
                    id: "m2.position", header: "m2", width: 100, template(obj) {
                        return obj.motors[1].position
                    }
                },
                {
                    id: "m3.position", header: "m3", width: 100, template(obj) {
                        return obj.motors[2].position
                    }
                },
                {id: "dummy", header: "", fillspace: true}
            ],
            data: [
                {
                    id: "Angle",
                    value: 0.1,
                    motors: controller.motors.find(motor => getMotorIds(`${id}`).includes(motor.id))
                },
                {
                    id: "Focus",
                    value: 0.1,
                    motors: controller.motors.find(motor => getMotorIds(`${id}`).includes(motor.id))
                },
                {
                    id: "Bias",
                    value: 0.1,
                    motors: controller.motors.find(motor => getMotorIds(`${id}`).includes(motor.id))
                }
            ]
        }))
}


export default class ControllerWidget extends WaltzWidget {
    constructor(ndx, controller, app) {
        super(ndx, app);
        this.controller = controller;
    }

    ui() {
        return {
            header: `${this.controller.ip}`,
            body: {
                rows: createCrystalPanels(this.controller)
            }
        }
    }
}