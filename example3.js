class Main {
    deserialiseRequest() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    validateRequest() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    persistData() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    serialiseResponse() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    process(request) {
        return new Promise((resolve, reject) => {
            this.deserialiseRequest(request).then((payload) => {
                this.validateRequest(payload).then(() => {
                    this.persistData().then(() => {
                        this.serialiseResponse().then(() => {
                            resolve();
                        });
                    }).catch((persistError) => {
                        this.serialiseResponse(persistError);
                    });
                }).catch((validationError) => {
                    reject(validationError);
                });
            }).catch((deserialisationError) => {
                this.serialiseResponse(deserialisationError);
            });
        });
    }
}

module.exports = Main;
