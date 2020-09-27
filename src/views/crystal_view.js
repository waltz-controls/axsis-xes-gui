export default function newCrystalView(crystal) {
    return {
        view: "accordionitem",
        header: "Crystal " + crystal.id,
        body:{
            rows: crystal.motors.map(motor => ({
                view:"toggle",
                type:"icon",
                offIcon:"mdi  mdi-eye-off",
                onIcon:"mdi mdi-eye",
                offLabel:"motor " + motor.id,
                onLabel:"motor " + motor.id
            }))
        }
    }
}