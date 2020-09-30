import {WaltzWidget} from "@waltz-controls/middleware";
import {kMotorsWidget} from "widgets/motors";
import {kCrystalsWidget} from "widgets/crystals";
import ControllerWidget from "./controller";
import PiAxisController, {kPiAxisControllerCtx, kPiAxisStop} from "controllers/pi_controller";
import {kFindAll} from "utils";

const kAxsisWidget = "widget:main";
const kAnyTopic = "*";

export default class AxsisMain extends WaltzWidget {
    constructor(app) {
        super(kAxsisWidget, app);

        this.listen(msg => {
            webix.message({
                text: msg,
                expire: 3000
            });
        }, kPiAxisStop);

        this.listen({
            next() {
            }, error(err) {
                webix.message({
                    text: err,
                    type: "error",
                    expire: 5000
                });
            }
        }, kAnyTopic)
    }

    ui(controllers) {
        return {
            cols: [
                {
                    view: "scrollview",
                    maxWidth: 240,
                    body: {
                        rows: [
                            {
                                view: "toggle",
                                type: "icon",
                                id: "servo",
                                offIcon: "mdi mdi-toggle-switch-off",
                                onIcon: "mdi mdi-toggle-switch-outline",
                                offLabel: "Servo OFF",
                                onLabel: "Servo ON",
                                click: () => {
                                    this.toggleServo($$("servo").getValue() === 0)
                                }
                            },
                            {
                                view: "button",
                                value: "HOME",
                                css: "webix_primary",
                                click: () => {
                                    this.homeAll();
                                }
                            },
                            {
                                view: "button",
                                value: "STOP",
                                css: "webix_danger",
                                click: () => {
                                    this.stopAll()
                                }
                            }
                            //TODO replace with mount points
                        ].concat(this.app.getWidget(kCrystalsWidget).ui())
                    }
                },
                {
                    view: "tabview",
                    cells: [
                        //TODO replace with mount points
                        new ControllerWidget(0, controllers[0], this.app).ui(),
                        new ControllerWidget(1, controllers[1], this.app).ui(),

                        {
                            header: "Motors",
                            body: this.app.getWidget(kMotorsWidget).ui()
                        },
                        {
                            header: "Log",
                            body: {
                                template: "Some content"
                            }
                        }
                    ]
                }
            ]
        }
    }

    async run() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);

        controllers.forEach(controller => this.app.registerController(application => new PiAxisController(application, controller)))

        webix.ui(this.ui(controllers))
    }

    async stopAll() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller).stop())
    }

    async homeAll() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller).home(null))
    }

    async toggleServo(value) {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller).toggleServo(
            controller.motors.find(kFindAll).reduce((obj, motor) => (obj[motor.id] = value, obj), {})
        ))
    }
}