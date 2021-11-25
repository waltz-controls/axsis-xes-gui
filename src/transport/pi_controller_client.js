const kDefaultEndpoint = "/axsis"

export default class PiControllerClient {
    constructor(controller, endpoint = kDefaultEndpoint) {
        this.controller = controller;
        this.endpoint = endpoint;
    }

    version() {
        const url = `${this.endpoint}/controllers/${this.controller.id}?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    position() {
        const url = `${this.endpoint}/controllers/${this.controller.id}/position?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    move(values) {
        const url = `${this.endpoint}/controllers/${this.controller.id}/position?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    home(values) {
        const url = `${this.endpoint}/controllers/${this.controller.id}/reference?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    //TODO axis id
    stop(values) {
        const url = `${this.endpoint}/controllers/${this.controller.id}/stop?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    servo() {
        const url = `${this.endpoint}/controllers/${this.controller.id}/servo?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    toggleServo(values) {
        const url = `${this.endpoint}/controllers/${this.controller.id}/servo?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    reference() {
        const url = `${this.endpoint}/controllers/${this.controller.id}/reference?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    stopAll() {
        const url = `${this.endpoint}/controllers/${this.controller.id}/stop?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT'
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }

    reboot() {
        const url = `${this.endpoint}/controllers/${this.controller.id}/reboot?ip=${this.controller.ip}&port=${this.controller.port}`
        return fetch(url, {
            method: 'PUT'
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else
                    throw new Error(`${resp.status}: ${resp.statusText}<p>${url}</p>`)
            })
    }
}