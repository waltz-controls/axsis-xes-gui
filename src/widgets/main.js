import {WaltzWidget} from "@waltz-controls/middleware";
import {kMotorsWidget} from "widgets/motors";
import {kCrystalsWidget} from "widgets/crystals";
import ControllerWidget from "./controller";
import {kPiAxisControllerCtx} from "../controllers/pi_controller";

const kAxsisWidget = "widget:main";

export default class AxsisMain extends WaltzWidget {
    constructor(app) {
        super(kAxsisWidget, app);
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
                                css: "webix_primary"
                            },
                            {
                                view: "button",
                                value: "STOP",
                                css: "webix_danger"
                            }
                        ].concat(this.app.getWidget(kCrystalsWidget).ui())
                    }
                },
                {
                    view: "tabview",
                    cells: [
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
        webix.ui(this.ui(controllers))
    }
}