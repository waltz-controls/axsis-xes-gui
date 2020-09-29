export function getMotorIds(crstlId) {
    if ('1' === crstlId || '5' === crstlId) return ['1', '3', '5'];
    if ('2' === crstlId || '6' === crstlId) return ['7', '9', '11'];
    if ('3' === crstlId || '7' === crstlId) return ['13', '15', '17'];
    if ('4' === crstlId || '8' === crstlId) return ['19', '21', '23'];
    return undefined;
}