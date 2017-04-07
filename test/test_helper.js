const mongoose = require('mongoose');

//done callback is only available in test helper world therefore we include it here and
//not in app.js
before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

//we include a catch method for the very first time the test suite runs for the database
// before every single test we drop collection and index goes away and is never created
// again we need another .then with ensureIndex, before an index must be there 2dsphere 
//(recreates it)
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere'}))
    .then(() => done())
    .catch(() => done());
});

