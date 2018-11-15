require('should');
const sinon = require('sinon');

const Dependency = require('./dep1');
const Main = require('./example1');

describe('Testing promises', () => {
  let main;
  let dependency;

  beforeEach(() => {
    dependency = new Dependency();
    main = new Main(dependency);
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

  xit('should fail with a reference error', () => {
    return main.badFunction().should.be.fulfilledWith('typo');
  });

  it('should fail when an error is thrown', () => {
    return main.throwError().should.be.rejectedWith('THROWN');
  });

  it('should work with dependencies', () => {
    sinon.stub(dependency, 'getDependedOnThing').resolves('dependency');

    return main.doSomethingWithDependency().should.be.fulfilledWith('Hello, dependency');
  });
});
