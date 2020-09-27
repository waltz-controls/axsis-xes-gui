import {WaltzWidget} from "@waltz-controls/middleware";
import PiController from "../models/pi_controller";
import {kControllersCtx, kMainApp} from "../../index";

export const kControllersWidget = "widget:controllers";
const kProceed = "widget:controllers:proceed"


function newLayout(center){
    return {
        rows: [
            {},
            {
                cols:[
                    {},
                    center,
                    {}
                ]
            },
            {}
        ]
    }
}


export default class ControllersWidget extends WaltzWidget {
    constructor(app) {
        super(kControllersWidget, app);

        this.listen(controllers => {
            this.proceed(controllers)
        },kProceed,kControllersWidget);
    }

    ui(){
        const root = this;
        return newLayout({
            view: "form",
            id:'frmControllers',
            elements: [
                {
                    view: "text",
                    name: "cntrl1",
                    label: "Controller 1 (host:port)",
                    labelWidth: 160,
                    placeholder: "127.0.0.1:5000",
                    validate: webix.rules.isNotEmpty,
                    invalidMessage: "host:port can not be empty"
                },
                {
                    view: "text",
                    name: "cntrl2",
                    label: "Controller 2 (host:port)",
                    labelWidth: 160,
                    placeholder: "127.0.0.2:5000",
                    validate: webix.rules.isNotEmpty,
                    invalidMessage: "host:port can not be empty"
                },
                {
                    cols: [
                        {
                            view: "button", value: "Proceed", type: "form", hotkey: "enter", click: function () {
                                const form = this.getFormView();
                                if (!form.validate()) return;
                                //TODO validate host:port


                                const controllers = [
                                    new PiController("Controller 1", form.getValues().cntrl1),
                                    new PiController("Controller 2", form.getValues().cntrl2)
                                ];


                                root.dispatch(controllers, kProceed, kControllersWidget);
                            }
                        },
                        {
                            view: "button", value: "Cancel", click: function () {
                                const form = this.getFormView();
                                form.clear();
                                form.clearValidation();
                            }
                        }
                    ]
                }
            ]
        })
    }

    run(){
        this.$$view = webix.ui(this.ui())
    }

    async proceed(controllers){
        this.$$view.destructor();
        const main = await this.app.getContext(kMainApp);
        main.registerContext(kControllersCtx, controllers);
        main.run();
    }
}