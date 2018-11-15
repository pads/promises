class Main {
  async deserialiseRequest(request) {
    return new Promise((resolve, reject) => {
      const inst = request.path.match(/\w*/g)[1];
      const model = {
        type: request.body.type,
        title: request.body.attributes.title
      };
      resolve({ model, inst });
    });
  }

  async validateRequest(input) {
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

  async persistData(input) {
    return new Promise((resolve, reject) => {
      // Pretend to save to a database
      setTimeout(() => {
        const persisted = Object.assign({ ...input.model }, { id: 'id1', created: '2018-11-15' });
        resolve({ ...input, model: persisted });
      }, 1000);
    });
  }

  async serialiseResponse(input) {
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

  async process(request) {
    const modelAndInst = await this.deserialiseRequest(request);
    await this.validateRequest(modelAndInst);
    const persistedAndInst = await this.persistData(modelAndInst);
    return await this.serialiseResponse(persistedAndInst);
  }
}

module.exports = Main;