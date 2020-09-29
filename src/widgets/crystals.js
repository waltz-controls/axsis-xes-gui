import {WaltzWidget} from "@waltz-controls/middleware";
import {getMotorIds} from "utils";

export const kCrystalsWidget = "widget:crystals";

function getCntrlId(crstlId) {
    if (['1', '2', '3', '4'].includes(crstlId)) return '0';
    if (['5', '6', '7', '8'].includes(crstlId)) return '1';
}

export const kToggleMotorVisibility = "toggleMotorVisibility";

function createCrystalPanels(root) {
    return ['1', '2', '3', '4', '5', '6', '7', '8'].map(crstlId => ({
        view: "accordionitem",
        header: "Crystal " + crstlId,
        body: {
            rows: getMotorIds(crstlId).map(motorId => ({
                view: "checkbox",
                id: `${getCntrlId(crstlId)}:${crstlId}:${motorId}`,
                labelRight: "motor " + motorId,
                value: 1,
                on: {
                    onChange(newVal, oldVal) {
                        root.dispatch({
                            id: `${getCntrlId(crstlId)}:${crstlId}:${motorId}`,
                            visible: newVal
                        }, kToggleMotorVisibility, kCrystalsWidget)
                    }
                }
            }))
        }
    }))
}

export default class CrystalsWidget extends WaltzWidget {
    constructor(app) {
        super(kCrystalsWidget, app);
    }

    ui() {
        return {
            view: "accordion",
            multi: true,
            rows: createCrystalPanels(this)
        }
    }
}