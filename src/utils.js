export const kFindAll = () => true;

export const kAllAxis = ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23"];

export function getMotorIds(crstlId) {
    if ('1' === crstlId || '5' === crstlId) return ['1', '3', '5'];
    if ('2' === crstlId || '6' === crstlId) return ['7', '9', '11'];
    if ('3' === crstlId || '7' === crstlId) return ['13', '15', '17'];
    if ('4' === crstlId || '8' === crstlId) return ['19', '21', '23'];
    return undefined;
}

export function getCrystalId(motorId, cntrlNdx) {
    if (['1', '3', '5'].includes(motorId)) return 1 + cntrlNdx * 4;
    if (['7', '9', '11'].includes(motorId)) return 2 + cntrlNdx * 4;
    if (['13', '15', '17'].includes(motorId)) return 3 + cntrlNdx * 4;
    if (['19', '21', '23'].includes(motorId)) return 4 + cntrlNdx * 4;
    return undefined;
}