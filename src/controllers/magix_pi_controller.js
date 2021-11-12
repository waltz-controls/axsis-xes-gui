import {Controller} from "@waltz-controls/middleware";
import {Message} from "@waltz-controls/waltz-magix-plugin"
import {filter, tap, timeout} from "rxjs/operators"
import {kMagixContext} from "../../index";
import {
    kPiAxisController,
    kPiAxisControllerDo,
    kPiAxisControllerDone,
    kPiAxisUpdateMotor
} from "controllers/pi_controller";


const kTimeout = 30000;

const kChannel = 'axsis-xes'
const kTarget = 'axsis'


export default class MagixPiController extends Controller {
    constructor(app, controller) {
        super(`magix.${controller.id}`, app);
        this.controller = controller;

        controller.motors.attachEvent("onDataUpdate",
            (id, updated, old) => {
                this.dispatch({
                    controllerId: controller.id,
                    ...updated
                }, kPiAxisUpdateMotor, kPiAxisController)
            }
        )

        this.app.getContext(kMagixContext).then(magix => {
            magix.observe(kChannel).pipe(
                tap(msg => console.debug(msg)),
                filter(msg => msg.payload &&
                    msg.payload.action === 'qPOS' &&
                    msg.payload.ip === this.controller.ip)
            ).subscribe(msg => {
                Object.keys(msg.payload.value).forEach(key => {
                    this.controller.motors.updateItem(key, {position: msg.payload.value[key]});
                })
            })
        })
    }

    async move(values){
        const magix = await this.app.getContext(kMagixContext);

        const id = +new Date();

        magix.observe(kChannel).pipe(
            tap(msg => console.debug(msg)),
            filter(msg => msg.parentId === id && msg.action === "done"),
            timeout(kTimeout)
        ).subscribe(msg => {
            this.dispatch(`Moving controller ${this.controller.ip} is done!`, kPiAxisControllerDone, kPiAxisController);
        }, err => {
            this.dispatchError(err);
        })

        magix.observe(kChannel).pipe(
            tap(msg => console.debug(msg)),
            filter(msg => msg.parentId === id && msg.action === 'error')
        ).subscribe(msg => {
            this.dispatchError(new Error(msg.payload.error));
        })


        this.dispatch(`Moving controller ${this.controller.ip}...`, kPiAxisControllerDo, kPiAxisController);
        magix.broadcast(new Message({
            id,
            target: kTarget,
            origin: 'axsis-gui',
            payload: {
                ip: this.controller.ip,
                port: this.controller.port,
                action: 'MOV',
                value: values
            }
        }), kChannel)
    }
}
