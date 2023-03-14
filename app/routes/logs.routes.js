module.exports = app => {
    const logs = require("../controllers/logs.controller.js");
    var router = require("express").Router();
    // Create a new logs
    router.post("/", logs.create);
    // Retrieve all logs
    router.get("/", logs.findAll);
    // Retrieve a single log with id
    router.get("/:id", logs.findOne);
    // Update a log with id
    router.put("/:id", logs.update);
    // Delete a log with id
    router.delete("/:id", logs.delete);
    // Delete all logs
    router.delete("/", logs.deleteAll);
    app.use('/api/logs', router);
  };