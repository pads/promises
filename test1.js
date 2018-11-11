require('should');

const Main = require('./example1');

describe('Testing promises', () => {
  let main;

  beforeEach(() => {
    main = new Main();
  });

  it('should resolve', () => {
    return main.resolveSomething().should.be.fulfilledWith('hello');
  });

  it('should reject', () => {
    return main.rejectSomething().should.be.rejectedWith('goodbye');
  });

  xit('should fail expecting a resolve', () => {
    return main.rejectSomething().should.be.fulfilledWith('hello');
  });

  xit('should timeout when the promise does not resolve or reject', () => {
    return main.deadEnd().should.be.fulfilledWith('hello');
  });

  it('should fail with a reference error', () => {
    return main.badFunction().should.be.fulfilledWith('typo');
  });
});