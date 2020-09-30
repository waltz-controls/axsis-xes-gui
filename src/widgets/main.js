import {WaltzWidget} from "@waltz-controls/middleware";
import {kMotorsWidget} from "widgets/motors";
import {kCrystalsWidget} from "widgets/crystals";
import ControllerWidget from "./controller";
import PiAxisController, {kPiAxisControllerCtx, kPiAxisStop} from "controllers/pi_controller";

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
                                view: "button",
                                value: "HOME",
                                css: "webix_primary",
                                click: () => {
                                    debugger
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
}