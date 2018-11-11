class Main {
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
}

module.exports = Main;