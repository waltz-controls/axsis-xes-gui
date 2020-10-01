import {WaltzWidget} from "@waltz-controls/middleware";
import {kPiAxisController, kPiAxisUpdateMotor} from "controllers/pi_controller";
import {getCrystalId, getMotorIds} from "utils";

function createCrystalPanels(controller) {
    return [1, 2, 3, 4]
        .map(id => id + (controller.id * 4))
        .map(id => ({
            view: "datatable",
            id: `${controller.id}:${id}`,
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
                {
                    id: "m1", header: "m1", width: 100
                },
                {
                    id: "m2", header: "m2", width: 100
                },
                {
                    id: "m3", header: "m3", width: 100
                },
                {id: "dummy", header: "", fillspace: true}
            ],
            data: [
                {
                    id: "Angle",
                    value: 0.1,
                    m1: controller.motors.getItem(getMotorIds(`${id}`)[0]).position,
                    m2: controller.motors.getItem(getMotorIds(`${id}`)[1]).position,
                    m3: controller.motors.getItem(getMotorIds(`${id}`)[2]).position
                },
                {
                    id: "Focus",
                    value: 0.1,
                    m1: controller.motors.getItem(getMotorIds(`${id}`)[0]).position,
                    m2: controller.motors.getItem(getMotorIds(`${id}`)[1]).position,
                    m3: controller.motors.getItem(getMotorIds(`${id}`)[2]).position
                },
                {
                    id: "Bias",
                    value: 0.1,
                    m1: controller.motors.getItem(getMotorIds(`${id}`)[0]).position,
                    m2: controller.motors.getItem(getMotorIds(`${id}`)[1]).position,
                    m3: controller.motors.getItem(getMotorIds(`${id}`)[2]).position
                }
            ]
        }))
}


export default class ControllerWidget extends WaltzWidget {
    constructor(ndx, controller, app) {
        super(ndx, app);
        this.controller = controller;

        this.listen(motor => {
            if (motor.controllerId !== controller.id) return;
            const data = $$(`${motor.controllerId}:${getCrystalId(motor.id, motor.controllerId)}`)
            const update = {
                m1: controller.motors.getItem(getMotorIds(`${getCrystalId(motor.id, motor.controllerId)}`)[0]).position,
                m2: controller.motors.getItem(getMotorIds(`${getCrystalId(motor.id, motor.controllerId)}`)[1]).position,
                m3: controller.motors.getItem(getMotorIds(`${getCrystalId(motor.id, motor.controllerId)}`)[2]).position
            }
            data.updateItem('Angle', update)
            data.updateItem('Focus', update)
            data.updateItem('Bias', update)
        }, kPiAxisUpdateMotor, kPiAxisController)
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