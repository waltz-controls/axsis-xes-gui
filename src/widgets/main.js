import {WaltzWidget} from "@waltz-controls/middleware";
import {kControllersCtx} from "../../index";
import newCrystalView from "views/crystal_view";
import PiCrystal from "../models/pi_crystal";
import PiMotor from "../models/pi_motor";

const kAxsisWidget = "main";

function createCrystals(){
    return new Array(8)
        .fill(0,0,8)
        .map((dummy, ndx) => ndx + 1)
        .map(ndx => new PiCrystal(ndx, null, [new PiMotor(3*ndx, null),new PiMotor(3*ndx + 1, null),new PiMotor(3*ndx + 2, null)]));
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
                    view: "accordion",
                    multi: true,
                    rows: [
                        {
                            rows:[
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
                },
                {
                    gravity: 4,
                    template: "tabview"
                }
            ]
        }
    }

    async run(){
        // const controllers = await this.app.getContext(kControllersCtx);
        webix.ui(this.ui())
    }
}