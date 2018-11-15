class Main {
  constructor(database) {
    this.database = database;
  }

  deserialiseRequest(request) {
    return new Promise((resolve, reject) => {
      const inst = request.path.match(/\w*/g)[1];
      const model = {
        type: request.body.type,
        title: request.body.attributes.title
      };
      resolve({ model, inst });
    });
  }

  validateRequest(input) {
    return new Promise((resolve, reject) => {
      const { model, inst } = input;
      if (model.title === '') {
        return reject(new Error('blank_title'));
      }
      if (inst !== 'talis') {
        return reject(new Error('unknown_inst'));
      }
      return resolve(input);
    });
  }

  persistData(input) {
    return this.database
      .save(input.model)
      .then(persisted => ({ ...input, model: persisted }))
  }

  serialiseResponse(input) {
    return new Promise((resolve, reject) => {
      const { model, inst } = input;
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
    return this
      .deserialiseRequest(request)
      .then(this.validateRequest)
      .then(this.persistData.bind(this))
      .then(this.serialiseResponse);
  }
}

module.exports = Main;
