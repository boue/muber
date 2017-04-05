const mongoose = require('mongoose');

//done callback is only available in test helper world therefore we include it here and
//not in app.js
before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    });
});

//we include a catch method for the very first time the test suite runs for the database
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});

