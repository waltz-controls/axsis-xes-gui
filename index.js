import {Application} from "@waltz-controls/middleware";
import AxsisMain from "widgets/main"
import ControllersWidget from "widgets/controllers";

export const kControllersCtx = "controllers";

export const kMainApp = "app:main";

const main = new Application({name:APPNAME, version:VERSION})
    .registerContext(kControllersCtx, Promise.resolve({
        ctrl1: '192.168.0.1',
        ctrl2: '192.168.0.2'
    }))
    .registerWidget(application => new AxsisMain(application))

const controllers = new Application({name:"pi_controllers", version: VERSION})
    .registerContext(kMainApp, Promise.resolve(main))
    .registerWidget(application => new ControllersWidget(application))
    .run()