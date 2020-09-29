import {WaltzWidget} from "@waltz-controls/middleware";

export const kCrystalsWidget = "widget:crystals";

function getCntrlId(crstlId) {
    if (['1', '2', '3', '4'].includes(crstlId)) return '0';
    if (['5', '6', '7', '8'].includes(crstlId)) return '1';
}

function getMotorIds(crstlId) {
    if ('1' === crstlId || '5' === crstlId) return ['1', '3', '5'];
    if ('2' === crstlId || '6' === crstlId) return ['7', '9', '11'];
    if ('3' === crstlId || '7' === crstlId) return ['13', '15', '17'];
    if ('4' === crstlId || '8' === crstlId) return ['19', '21', '23'];
    return undefined;
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