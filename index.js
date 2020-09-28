import {Application} from "@waltz-controls/middleware";
import AxsisMain from "widgets/main"
import ControllersWidget from "widgets/controllers";

export const kControllersCtx = "controllers";

export const kMainApp = "app:main";

const main = new Application({name:APPNAME, version:VERSION})
    .registerWidget(application => new AxsisMain(application))

const controllers = new Application({name:"pi_controllers", version: VERSION})
    .registerContext(kMainApp, Promise.resolve(main))
    .registerWidget(application => new ControllersWidget(application))
    .run()