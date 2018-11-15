class FakeDatabase {
    save(model) {
        return new Promise((resolve, reject) => {
            // Pretend to save to a database
            setTimeout(() => {
              const persisted = Object.assign({ ...model }, { id: 'id1', created: '2018-11-15' });
              resolve(persisted);
            }, 1000);
          });
    }
}

module.exports = FakeDatabase;
