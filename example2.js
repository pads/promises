class Main {
    deserialiseRequest(request) {
        return new Promise((resolve, reject) => {
            const model = {
              type: request.body.type,
              title: request.body.attributes.title
            };
            resolve(model);
        });
    }

    validateRequest(inst, model) {
        return new Promise((resolve, reject) => {
            if (model.title === '') {
              return reject(new Error('blank_title'));
            }
            if (inst !== 'talis') {
              return reject(new Error('unknown_inst'));
            }
            resolve();
        });
    }

    persistData(model) {
        return new Promise((resolve, reject) => {
            // Pretend to save to a database
            setTimeout(() => {
                const persisted = Object.assign({ ...model }, { id: 'id1', created: '2018-11-15' });
                resolve(persisted);
            }, 1000);
        });
    }

    serialiseResponse(inst, model) {
        return new Promise((resolve, reject) => {
            const response = {
              id: model.id,
              type: model.type,
              attributes: {
                title: model.title
              },
              meta: {
                inst,
                created: model.created
              }
            }
            resolve(response);
        });
    }

    process(request) {
        const inst = request.path.match(/\w*/g)[1];

        return new Promise((resolve, reject) => {
            this.deserialiseRequest(request).then((model) => {
                this.validateRequest(inst, model).then(() => {
                    this.persistData(model).then((persisted) => {
                        this.serialiseResponse(inst, persisted).then((response) => {
                            resolve(response);
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
