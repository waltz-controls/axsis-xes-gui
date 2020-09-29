import {WaltzWidget} from "@waltz-controls/middleware";
import {kMotorsWidget} from "widgets/motors";
import {kCrystalsWidget} from "widgets/crystals";

const kAxsisWidget = "widget:main";

export default class AxsisMain extends WaltzWidget {
    constructor(app) {
        super(kAxsisWidget, app);
    }



    ui(){
        return {
            cols:[
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

    async run(){
        // const controllers = await this.app.getContext(kControllersCtx);
        webix.ui(this.ui())
    }
}