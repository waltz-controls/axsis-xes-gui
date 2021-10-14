import {WaltzWidget} from "@waltz-controls/middleware";
import {kPiAxisController, kPiAxisUpdateMotor} from "controllers/pi_controller";
import {getCrystalId, getMotorIds} from "utils";

function createCrystalPanels(controller, root) {
    return [1, 2, 3, 4]
        .map(id => id + (controller.id * 4))
        .map(id => ({
            view: "datatable",
            id: `${controller.id}:${id}`,
            editable: true,
            columns: [
                {id: "id", header: `Crystal ${id}`, width: 150},
                {
                    id: "neg", header: "", width: 30, template() {
                        return `<div class='webix_el_button negative webix_base'><span class="webix_icon wxi-minus"></span></div>`
                    }
                },
                {id: "value", header: "Value", width: 120, editor: "text"},
                {
                    id: "pos", header: "", template() {
                        return `<div class='webix_el_button positive webix_base'><span class="webix_icon wxi-plus"></span></div>`
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
            ],
            onClick: {
                "negative": (ev, coord) => {
                    const row = coord.row;
                    const datatable = $$(`${controller.id}:${id}`);
                    datatable.editStop();
                    const value = parseFloat(datatable.getItem(row).value)
                    switch (row) {
                        case 'Angle':
                            return root.decrementAngle(id, value, getMotorIds(`${id}`))
                        case 'Bias':
                            return root.leftBias(id, value, getMotorIds(`${id}`))
                        case 'Focus':
                            return root.backwardFocus(id, value, getMotorIds(`${id}`))
                    }

                },
                "positive": (ev, coord) => {
                    const row = coord.row;
                    const datatable = $$(`${controller.id}:${id}`);
                    datatable.editStop();
                    const value = parseFloat(datatable.getItem(row).value)
                    switch (row) {
                        case 'Angle':
                            return root.incrementAngle(id, value, getMotorIds(`${id}`))
                        case 'Bias':
                            return root.rightBias(id, value, getMotorIds(`${id}`))
                        case 'Focus':
                            return root.forwardFocus(id, value, getMotorIds(`${id}`))
                    }
                }
            }
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
                rows: createCrystalPanels(this.controller, this)
            }
        }
    }

    /**
     * [+][+][-]
     *
     * @param value
     * @param motorIds
     */
    decrementAngle(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        let values;
        switch (crstlId) {
            case 1:
            case 3:
            case 5:
            case 7:
                values = {
                    [motorIds[0]]: m1.position + value,
                    [motorIds[1]]: m2.position + value,
                    [motorIds[2]]: m3.position - value
                }
                break;
            case 2:
            case 4:
            case 6:
            case 8:
                values = {
                    [motorIds[0]]: m1.position - value,
                    [motorIds[1]]: m2.position - value,
                    [motorIds[2]]: m3.position + value
                }
                break;
        }

        controller.move(values);
    }

    /**
     * [-][-][+]
     *
     *
     * @param value
     * @param motorIds
     */
    incrementAngle(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        let values;
        switch (crstlId) {
            case 1:
            case 3:
            case 5:
            case 7:
                values = {
                    [motorIds[0]]: m1.position - value,
                    [motorIds[1]]: m2.position - value,
                    [motorIds[2]]: m3.position + value
                }
                break;
            case 2:
            case 4:
            case 6:
            case 8:
                values = {
                    [motorIds[0]]: m1.position + value,
                    [motorIds[1]]: m2.position + value,
                    [motorIds[2]]: m3.position - value
                }
                break;
        }

        controller.move(values);
    }

    /**
     * move left
     *
     * @param crstlId
     * @param value
     * @param motorIds
     */
    leftBias(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        let values;
        switch (crstlId) {
            case 1:
            case 3:
            case 5:
            case 7:
                values = {
                    [motorIds[0]]: m1.position - value,
                    [motorIds[1]]: m2.position + value,
                    [motorIds[2]]: m3.position - value
                }
                break;
            case 2:
            case 4:
            case 6:
            case 8:
                values = {
                    [motorIds[0]]: m1.position - value,
                    [motorIds[1]]: m2.position + value,
                    [motorIds[2]]: m3.position + value
                }
                break;
        }

        controller.move(values);
    }

    /**
     * move right
     *
     * @param crstlId
     * @param value
     * @param motorIds
     */
    rightBias(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        let values;
        switch (crstlId) {
            case 1:
            case 3:
            case 5:
            case 7:
                values = {
                    [motorIds[0]]: m1.position + value,
                    [motorIds[1]]: m2.position - value,
                    [motorIds[2]]: m3.position + value
                }
                break;
            case 2:
            case 4:
            case 6:
            case 8:
                values = {
                    [motorIds[0]]: m1.position + value,
                    [motorIds[1]]: m2.position - value,
                    [motorIds[2]]: m3.position - value
                }
                break;
        }

        controller.move(values);
    }

    /**
     *
     *
     * @param crstlId
     * @param value
     * @param motorIds
     */
    backwardFocus(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        const values = {
            [motorIds[0]]: m1.position - value,
            [motorIds[1]]: m2.position - value,
            [motorIds[2]]: m3.position - value
        }

        controller.move(values);
    }

    forwardFocus(crstlId, value, motorIds) {
        const controller = this.app.getController(`magix.${this.controller.id}`)

        const motors = controller.controller.motors;
        const m1 = motors.getItem(motorIds[0]);
        const m2 = motors.getItem(motorIds[1]);
        const m3 = motors.getItem(motorIds[2]);

        const values = {
            [motorIds[0]]: m1.position + value,
            [motorIds[1]]: m2.position + value,
            [motorIds[2]]: m3.position + value
        }

        controller.move(values);
    }


}