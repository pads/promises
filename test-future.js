require('should');

const Main = require('./future');

describe('Async/await example', () => {
  let main;

  beforeEach(() => {
    main = new Main();
  });

  it('should resolve given a valid title', async () => {
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

    const result = await main.process(request);
    result.should.equal(response);
  });

  it('should reject given a blank title', async () => {
    const request = {
      path: '/talis/things',
      body: {
        type: 'things',
        attributes: {
          title: ''
        }
      }
    };

    try {
      const result = await main.process(request);
      result.not.not.be.ok;
    } catch (error) {
      error.message.should.equal('blank_title');
    }
  });

  it('should reject given an unknown institution', async () => {
    const request = {
      path: '/stranger/things',
      body: {
        type: 'things',
        attributes: {
          title: 'The Thing'
        }
      }
    };

    try {
      const result = await main.process(request);
      result.not.not.be.ok;
    } catch (error) {
      error.message.should.equal('unknown_inst');
    }
  });
});