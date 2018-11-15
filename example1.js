class Main {
  constructor(dependency) {
    this.dependency = dependency;
  }

  resolveSomething() {
    return new Promise((resolve, reject) => {
      resolve('hello');
    });
  }

  rejectSomething() {
    return new Promise((resolve, reject) => {
      reject(new Error('goodbye'));
    });
  }

  deadEnd() {
    return new Promise(() => {});
  }

  badFunction() {
    return new Promise((resolve) => {
      const typo = 'typo';
      resolve(oops.typo);
    });
  }

  throwError() {
    return new Promise(() => {
      throw new Error('THROWN');
    });
  }

  doSomethingWithDependency() {
    return this.dependency
      .getDependedOnThing()
      .then(thing => `Hello, ${thing}`);
  }
}

module.exports = Main;
