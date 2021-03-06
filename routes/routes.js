const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  //we re not calling the greeting function just a reference. Run function everytime 
  //you have a get request to route
  app.post('/api/drivers', DriversController.create);
  app.put('/api/drivers/:id', DriversController.edit);
  app.delete('/api/drivers/:id', DriversController.delete);
  app.get('/api/drivers', DriversController.index);
};

