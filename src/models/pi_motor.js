export const kDummyMotors = [
    {id: "Crystal 1 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 1 Motor 2", position: 12.2, servo: true},
    {id: "Crystal 1 Motor 3", position: 12.2, servo: false},
    {id: "Crystal 2 Motor 1", position: 12.2, servo: true},
    {id: "Crystal 2 Motor 2", position: 12.2, servo: false},
    {id: "Crystal 2 Motor 3", position: 12.2, servo: true},
    {id: "Crystal 3 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 3 Motor 2", position: 12.2, servo: false},
    {id: "Crystal 3 Motor 3", position: 12.2, servo: true},
    {id: "Crystal 4 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 4 Motor 2", position: 12.2, servo: true},
    {id: "Crystal 4 Motor 3", position: 12.2, servo: true},
    {id: "Crystal 5 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 5 Motor 2", position: 12.2, servo: true},
    {id: "Crystal 5 Motor 3", position: 12.2, servo: false},
    {id: "Crystal 6 Motor 1", position: 12.2, servo: true},
    {id: "Crystal 6 Motor 2", position: 12.2, servo: false},
    {id: "Crystal 6 Motor 3", position: 12.2, servo: true},
    {id: "Crystal 7 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 7 Motor 2", position: 12.2, servo: false},
    {id: "Crystal 7 Motor 3", position: 12.2, servo: true},
    {id: "Crystal 8 Motor 1", position: 12.2, servo: false},
    {id: "Crystal 8 Motor 2", position: 12.2, servo: true},
    {id: "Crystal 8 Motor 3", position: 12.2, servo: true}
];

export default class PiMotor {
    constructor(id, position, servo, reference) {
        this.id = id;
        this.position = position;
        this.servo = servo;
        this.reference = reference;
    }
}