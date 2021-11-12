import {Application} from "@waltz-controls/middleware";
import AxsisMain from "widgets/main"
import ControllersWidget from "widgets/controllers";
import MotorsWidget from "widgets/motors";
import CrystalsWidget from "widgets/crystals";
import {Magix} from "@waltz-controls/waltz-magix-plugin";

const kMagixHost = PRODUCTION ? '' : 'http://localhost:8080';
export const kMagixContext = 'context:magix'
export const kMainApp = "app:main";

const main = new Application({name: APPNAME, version: VERSION})
    .registerContext(kMagixContext,new Magix(kMagixHost))
    .registerWidget(application => new AxsisMain(application))
    .registerWidget(application => new CrystalsWidget(application))
    .registerWidget(application => new MotorsWidget(application))

const controllers = new Application({name: "pi_controllers", version: VERSION})
    .registerContext(kMainApp, Promise.resolve(main))
    .registerWidget(application => new ControllersWidget(application))
    .run()