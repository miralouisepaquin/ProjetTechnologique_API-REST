module.exports = app => {
    const sensors = require("../controllers/sensors.controller.js");
    var router = require("express").Router();
    // Create a new sensor
    router.post("/", sensors.create);
    // Retrieve all sensors
    router.get("/", sensors.findAll);
    // Retrieve a single sensor with id
    router.get("/:id", sensors.findOne);
    // Update a sensor with id
    router.put("/:id", sensors.update);
    // Delete a sensor with id
    router.delete("/:id", sensors.delete);
    // Delete all sensor
    router.delete("/", sensors.deleteAll);
	
    app.use('/api/sensors', router);
  };