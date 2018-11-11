class Main {
  deserialiseRequest(request) {
    return new Promise((resolve, reject) => {
      const model = {
        type: request.type,
        title: request.attributes.title
      };
      resolve(model);
    });
  }

  validateRequest(model) {
    return new Promise((resolve, reject) => {
      if (model.title === '') {
        return reject(new Error('blank_title'));
      }
      return resolve(model);
    });
  }

  persistData(model) {
    return new Promise((resolve, reject) => {
      // Pretend to save to a database
      setTimeout(() => {
        resolve(Object.assign({ ...model }, { id: 'id1', created: '2018-11-15' }));
      }, 1000);
    });
  }

  serialiseResponse(model) {
    return new Promise((resolve, reject) => {
      const response = {
        id: model.id,
        type: model.type,
        attributes: {
          title: model.title
        },
        meta: {
          created: model.created
        }
      }
      resolve(response);
    });
  }
}

module.exports = Main;