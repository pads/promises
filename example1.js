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
}

module.exports = Main;