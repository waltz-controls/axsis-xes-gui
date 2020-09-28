import {WaltzWidget} from "@waltz-controls/middleware";
import newCrystalView from "views/crystal_view";
import PiCrystal from "models/pi_crystal";
import PiMotor, {kDummyMotors} from "models/pi_motor";

const kAxsisWidget = "widget:main";

function createCrystals() {
    return new Array(8)
        .fill(0, 0, 8)
        .map((dummy, ndx) => ndx + 1)
        .map(ndx => new PiCrystal(ndx, null, [new PiMotor(3 * ndx, null), new PiMotor(3 * ndx + 1, null), new PiMotor(3 * ndx + 2, null)]));
}

function createCrystalPanels(crystals){
    return crystals.map(crystal => newCrystalView(crystal));
}

export default class AxsisMain extends WaltzWidget {
    constructor(app) {
        super(kAxsisWidget, app);


        this.crystals = createCrystals();
    }



    ui(){
        return {
            cols:[
                {
                    view: "scrollview",
                    maxWidth: 240,
                    body: {
                        view: "accordion",
                        multi: true,
                        rows: [
                            {
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
                                ]
                            }

                        ].concat(createCrystalPanels(this.crystals))
                    }
                },
                {
                    view: "tabview",
                    cells: [
                        {
                            header: "138",
                            body: {
                                rows: [
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 1", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 2", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 3", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 4", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            header: "139",
                            body: {
                                rows: [
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 1", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 2", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 3", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        columns: [
                                            {id: "id", header: "Crystal 4", width: 150},
                                            {id: "value", header: "Value", width: 120},
                                            {
                                                id: "plusminus", header: "Pos/Neg", template(obj) {
                                                    return `<span class="webix_icon switcher mdi mdi-${obj.plusminus ? "plus" : "minus"}"></span>`
                                                }, width: 80
                                            },
                                            {
                                                id: "reference", header: "", width: 100, template() {
                                                    return `<div class='webix_el_button webix_primary'><button class="webix_button">Set</button></div>`
                                                }
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
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Focus",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            },
                                            {
                                                id: "Bias",
                                                value: 0.1,
                                                plusminus: 0,
                                                motors: [{position: 12.2}, {position: 12.2}, {position: 12.2}]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            header: "Motors",
                            body: {
                                view: "datatable",
                                columns: [
                                    {id: "id", header: "", width: 150},
                                    {id: "position", header: "Position", width: 120},
                                    {
                                        id: "servo", header: "Servo", template(obj) {
                                            return `<span class="webix_icon switcher mdi mdi-toggle-switch-${obj.servo ? "off" : "outline"}"></span>`
                                        }, width: 80
                                    },
                                    {
                                        id: "reference", header: "Reference", width: 100, template() {
                                            return `<div class='webix_el_button webix_primary'><button class="webix_button">Home</button></div>`
                                        }
                                    },
                                    {
                                        id: "stop", header: "Stop", width: 100, template() {
                                            return `<div class='webix_el_button webix_danger'><button class="webix_button">Stop</button></div>`
                                        }
                                    },
                                    {id: "dummy", header: "", fillspace: true}
                                ],
                                data: kDummyMotors
                            }
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

    async run(){
        // const controllers = await this.app.getContext(kControllersCtx);
        webix.ui(this.ui())
    }
}