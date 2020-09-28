import {WaltzWidget} from "@waltz-controls/middleware";
import PiController from "models/pi_controller";
import {kControllersCtx, kMainApp} from "../../index";
import PiAxisController, {kPiAxisController} from "controllers/pi_controller";

export const kControllersWidget = "widget:controllers";
const kProceed = "widget:controllers:proceed"

const kDefaultPiPort = "50000";

function validateIpAndPort(input) {
    let [host, port] = input.split(":");
    port = port || kDefaultPiPort;
    const ip = host.split(".");
    return validateNum(port, 1, 65535) &&
        ip.length === 4 &&
        ip.every(function (segment) {
            return validateNum(segment, 0, 255);
        });
}

function validateNum(input, min, max) {
    const num = +input;
    return num >= min && num <= max && input === num.toString();
}

function newPiController(input) {
    let [host, port] = input.split(":");
    port = +port || +kDefaultPiPort;
    return new PiController(host.split('.')[3], host, port)
}

function newLayout(center) {
    return {
        rows: [
            {},
            {
                cols: [
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

        this.listen({
            next() {
            }, error(err) {
                webix.message({
                    text: err,
                    type: "error",
                    expire: 5000
                });
            }
        }, kPiAxisController)
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
                    placeholder: "127.0.0.1:50000",
                    invalidMessage: "host:port is not valid"
                },
                {
                    view: "text",
                    name: "cntrl2",
                    label: "Controller 2 (host:port)",
                    labelWidth: 160,
                    placeholder: "127.0.0.2:50000",
                    invalidMessage: "host:port is not valid"
                },
                {
                    cols: [
                        {
                            view: "button", value: "Proceed", type: "form", hotkey: "enter", click: function () {
                                const form = this.getFormView();
                                if (!form.validate()) return;

                                const controllers = [
                                    newPiController(form.getValues().cntrl1),
                                    newPiController(form.getValues().cntrl2)
                                ];


                                webix.storage.session.put(kControllersCtx, form.getValues());
                                root.proceed(controllers);
                            }
                        },
                        {
                            view: "button", value: "Cancel", click: function () {
                                const form = this.getFormView();
                                form.clear();
                                form.clearValidation();
                                webix.storage.session.remove(kControllersCtx);
                            }
                        }
                    ]
                }
            ],
            rules: {
                cntrl1(value) {
                    return validateIpAndPort(value);
                },
                cntrl2(value) {
                    return validateIpAndPort(value);
                }
            }
        })
    }

    run() {
        this.$$view = webix.ui(this.ui())

        if (webix.storage.session.get(kControllersCtx) !== null) {
            $$('frmControllers').setValues(webix.storage.session.get(kControllersCtx))
        }
    }

    proceed(controllers) {
        //TODO progress
        Promise.all(controllers.map(controller => {
            return new PiAxisController(this.app, controller).initialize()
        })).then(async controllers => {
            this.$$view.destructor();
            const main = await this.app.getContext(kMainApp);
            main.registerContext(kControllersCtx, controllers);
            main.run();
        })
    }
}