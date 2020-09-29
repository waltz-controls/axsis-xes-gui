import {Application} from "@waltz-controls/middleware";
import AxsisMain from "widgets/main"
import ControllersWidget from "widgets/controllers";
import MotorsWidget from "widgets/motors";
import CrystalsWidget from "widgets/crystals";


export const kMainApp = "app:main";

const main = new Application({name: APPNAME, version: VERSION})
    .registerWidget(application => new AxsisMain(application))
    .registerWidget(application => new CrystalsWidget(application))
    .registerWidget(application => new MotorsWidget(application))

const controllers = new Application({name: "pi_controllers", version: VERSION})
    .registerContext(kMainApp, Promise.resolve(main))
    .registerWidget(application => new ControllersWidget(application))
    .run()