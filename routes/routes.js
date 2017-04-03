const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  //we re not calling the greeting function just a reference. Run function everytime 
  //you have a get request to route
  app.get('/api', DriversController.greeting);
};