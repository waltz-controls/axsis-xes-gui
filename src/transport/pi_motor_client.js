const kDefaultEndpoint = "/axsis"

export default class PiMotorClient {
    constructor(controller, motor, endpoint = kDefaultEndpoint) {
        this.controller = controller;
        this.motor = motor;
        this.endpoint = endpoint;
    }

    move(target) {
        const url = `${this.endpoint}/controllers/${this.controller.id}/axis/${this.motor.id}/position?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [`${this.motor.id}`]: target
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

}