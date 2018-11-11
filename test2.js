require('should');

const Main = require('./example2');

describe('Flat-chaining example', () => {
  let main;

  beforeEach(() => {
    main = new Main();
  });

  it('should resolve given a valid title', () => {
    const request = {
      path: '/talis/things',
      body: {
        type: 'things',
        attributes: {
          title: 'The Thing'
        }
      }
    };
    const response = {
      id: 'id1',
      type: 'things',
      attributes: {
        title: 'The Thing'
      },
      meta: {
        inst: 'talis',
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
      path: '/talis/things',
      body: {
        type: 'things',
        attributes: {
          title: ''
        }
      }
    };

    return main
      .deserialiseRequest(request)
      .then(main.validateRequest)
      .then(main.persistData)
      .then(main.serialiseResponse)
      .should.be.rejectedWith('blank_title');

  });

  it('should reject given an unknown institution', () => {
    const request = {
      path: '/stranger/things',
      body: {
        type: 'things',
        attributes: {
          title: 'The Thing'
        }
      }
    };

    return main
      .deserialiseRequest(request)
      .then(main.validateRequest)
      .then(main.persistData)
      .then(main.serialiseResponse)
      .should.be.rejectedWith('unknown_inst');

  });
});