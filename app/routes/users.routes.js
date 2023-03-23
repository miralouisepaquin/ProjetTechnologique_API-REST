module.exports = app => {
    const usersController = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/createUser", usersController.create);
    // Retrieve all users
    router.get("/findAllUsers", usersController.findAll);
    // Retrieve a single user with id
    router.get("/findUser/:id", usersController.findOne);
    // Update a user with id
    router.put("/updateUser/:id", usersController.update);
    // Delete a user with id
    router.delete("/deleteUser/:id", usersController.delete);
	// Delete all logs
    router.delete("/deleteAllUsers", usersController.deleteAll);
	
	app.use('/api/users', router);
  };