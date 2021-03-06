require('should');
const sinon = require('sinon');

const FakeDatabase = require('./fake-database');
const Main = require('./example3');

describe('Flat-chaining example', () => {
  let database;
  let main;

  beforeEach(() => {
    database = new FakeDatabase();
    main = new Main(database);
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

    return main.process(request).should.be.fulfilledWith(response);
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

    return main.process(request).should.be.rejectedWith('blank_title');
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

    return main.process(request).should.be.rejectedWith('unknown_inst');
  });

  it('should reject when the database fails to save', () => {
    const request = {
      path: '/talis/things',
      body: {
        type: 'things',
        attributes: {
          title: 'The Thing'
        }
      }
    };

    sinon.stub(database, 'save').rejects(new Error('database_error'));

    return main.process(request).should.be.rejectedWith('database_error');
  });
});
