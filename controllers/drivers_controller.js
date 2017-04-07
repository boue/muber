const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there'});
  },

  index(req, res, next) {
    //reference to query string in URL like google.com?lng=80&lat=80
    //everything after ? is a query so we will assume when they want a driver it contains users 
    //lng and lat
    const { lng, lat } = req.query;
    //units is meters so 200km
    //returns a promise
    Driver.geoNear(
      { type: 'Point', coordinates: [lng, lat] },
      { spherical: true, maxDistance: 200000 }
    )
  }

  create(req, res, next){
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)    
      .then(() => Driver.findById( {_id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },
  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  },
  
};