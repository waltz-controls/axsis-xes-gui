import {WaltzWidget} from "@waltz-controls/middleware";
import {kMotorsWidget} from "widgets/motors";
import {kCrystalsWidget} from "widgets/crystals";
import ControllerWidget from "./controller";
import PiAxisController, {
    kPiAxisController,
    kPiAxisControllerCtx,
    kPiAxisControllerDo,
    kPiAxisControllerDone,
    kPiAxisStop
} from "controllers/pi_controller";
import MagixPiController from "controllers/magix_pi_controller";
import {getCrystalId} from "../utils";

const kAxsisWidget = "widget:main";
const kAnyTopic = "*";

const kAllAxis = ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23"];

export default class AxsisMain extends WaltzWidget {
    constructor(app) {
        super(kAxsisWidget, app);

        this.listen(() => {
            this.$view.showProgress()
        }, kPiAxisControllerDo, kPiAxisController)
        this.listen(() => {
            this.$view.hideProgress()
        }, kPiAxisControllerDone, kPiAxisController)

        this.listen(msg => {
            webix.message({
                text: msg,
                expire: 3000
            });
        }, kPiAxisStop);

        this.listen({
            next() {
            }, error:(err) =>{
                this.$view.hideProgress()
                webix.message({
                    text: err,
                    type: "error"
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
                                value: "HOME SELECTED",
                                css: "webix_primary",
                                click: () => {
                                    this.homeAll();
                                }
                            },
                            {
                                view: "button",
                                value: "STOP ALL",
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
        controllers.forEach(controller => this.app.registerController(application => new MagixPiController(application, controller)))

        this.$view = webix.ui(this.ui(controllers))

        webix.extend(this.$view, webix.ProgressBar)
    }

    async stopAll() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller).stop(kAllAxis))
    }

    async homeAll() {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller)
            .home(kAllAxis.filter(motorId => $$(`${controller.id}:${getCrystalId(motorId, controller.id)}:${motorId}`).getValue() === 1)))//motor checkbox in the crystals accordion
    }

    async toggleServo(value) {
        const controllers = await this.app.getContext(kPiAxisControllerCtx);
        controllers.forEach(controller => new PiAxisController(this.app, controller).toggleServo(
            kAllAxis.reduce((obj, id) => (obj[id] = value, obj), {})
        ))
    }
}