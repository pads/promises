require('should');

const Main = require('./example2');

describe('Flat-chaining example', () => {
  let main;

  beforeEach(() => {
    main = new Main();
  });

  it('should resolve given a valid title', () => {
    const request = {
      type: 'things',
      attributes: {
        title: 'The Thing'
      }
    };
    const response = {
      id: 'id1',
      type: 'things',
      attributes: {
        title: 'The Thing'
      },
      meta: {
        created: '2018-11-15'
      }
    };

    return main
      .deserialiseRequest(request)
      .then(main.validateRequest)
      .then(main.persistData)
      .then(main.serialiseResponse)
      .should.be.fulfilledWith(response);

  });

  it('should reject given a blank title', () => {
    const request = {
      type: 'things',
      attributes: {
        title: ''
      }
    };

    return main
      .deserialiseRequest(request)
      .then(main.validateRequest)
      .then(main.persistData)
      .then(main.serialiseResponse)
      .should.be.rejectedWith('blank_title');

  });
});