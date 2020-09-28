export default function newCrystalView(crystal) {
    return {
        view: "accordionitem",
        header: "Crystal " + crystal.id,
        body:{
            rows: crystal.motors.map(motor => ({
                view: "checkbox",
                id: "visible" + motor.id,
                labelRight: "motor " + motor.id,
                value: 1
            }))
        }
    }
}