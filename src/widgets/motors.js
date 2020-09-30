import {WaltzWidget} from "@waltz-controls/middleware";
import {kPiAxisController, kPiAxisControllerCtx, kPiAxisUpdateMotor} from "controllers/pi_controller";
import {kCrystalsWidget, kToggleMotorVisibility} from "widgets/crystals";

const kFindAll = () => true;

export const kMotorsWidget = "widget:motor";

function getCrystalId(motorId, cntrlNdx) {
    if (['1', '3', '5'].includes(motorId)) return 1 + cntrlNdx * 4;
    if (['7', '9', '11'].includes(motorId)) return 2 + cntrlNdx * 4;
    if (['13', '15', '17'].includes(motorId)) return 3 + cntrlNdx * 4;
    if (['19', '21', '23'].includes(motorId)) return 4 + cntrlNdx * 4;
    return undefined;
}

export default class MotorsWidget extends WaltzWidget {
    constructor(app) {
        super(kMotorsWidget, app);

        this.listen(payload => {
            this.view.updateItem(payload.id, payload)

            this.view.filter(item => item.visible)
        }, kToggleMotorVisibility, kCrystalsWidget)

        this.listen(motor => {
            const {position, servo, reference} = motor;
            this.view.updateItem(`${motor.controllerId}:${getCrystalId(motor.id, motor.controllerId)}:${motor.id}`, {
                position,
                servo,
                reference
            })
        }, kPiAxisUpdateMotor, kPiAxisController)
    }

    ui() {
        return {
            view: "datatable",
            id: "motors",
            editable: true,
            columns: [
                {
                    id: "id", header: "Motor", width: 150, template(obj) {
                        const [ctrlId, crstlId, motorId] = obj.id.split(':');
                        return `<strong>Crystal ${crstlId}</strong> Motor ${motorId}`;
                    }
                },
                {id: "position", header: "Position", width: 240, editor: "text"},
                {
                    id: "set", header: "", template(obj) {
                        return `<div class='webix_el_button set webix_base'><button class="webix_button">Set</button></div>`
                    }, width: 80
                },
                {
                    id: "servo", header: "Servo", template(obj) {
                        return `<span class="webix_icon servo mdi mdi-toggle-switch-${obj.servo ? "outline" : "off"}"></span>`
                    }, width: 80
                },
                {
                    id: "reference", header: "Reference", width: 100
                },
                {
                    id: "home", header: "", width: 100, template() {
                        return `<div class='webix_el_button home webix_primary'><button class="webix_button">Home</button></div>`
                    }
                },
                {
                    id: "stop", header: "", width: 100, template() {
                        return `<div class='webix_el_button webix_danger'><button class="webix_button">Stop</button></div>`
                    }
                },
                {id: "dummy", header: "", fillspace: true}
            ],
            onClick: {
                "set": (ev, id) => {
                    const [ctrlId, crstlId, motorId] = id.row.split(':')
                    this.view.editStop();
                    const target = parseFloat(this.view.getItem(id.row).position);
                    const controller = this.app.getController(ctrlId);
                    controller
                        .move({
                            [motorId]: target
                        })
                },
                "servo": (ev, id) => {
                    const [ctrlId, crstlId, motorId] = id.row.split(':')
                    const newServo = !this.view.getItem(id.row).servo;
                    const controller = this.app.getController(ctrlId);
                    controller
                        .toggleServo({
                            [motorId]: newServo
                        })

                },
                "home": (ev, id) => {

                }
            }
        }
    }

    get view() {
        return $$('motors');
    }

    async run() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);

        this.view.clearAll();
        this.view.parse(
            controllers
                .flatMap((controller, ndx) =>
                    controller.motors.find(kFindAll).map(motor => ({
                        ...motor,
                        id: `${controller.id}:${getCrystalId(motor.id, ndx)}:${motor.id}`,
                        visible: true
                    })))
        )
    }
}