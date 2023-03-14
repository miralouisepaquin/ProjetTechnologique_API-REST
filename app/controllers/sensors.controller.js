const db = require("../models");
const Sensors = db.sensors;
// Create and Save a new Sensors
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Sensor
  const sensors = new Sensors({
    name: req.body.name,
    friendlyName: req.body.friendlyName,
    room: req.body.room
  });
  // Save Sensors in the database
  sensors
    .save(sensors)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sensors."
      });
    });
};
// Retrieve all Sensors from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Sensors.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sensors."
        });
      });
};
// Find a single Sensor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Sensors.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Sensors with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Sensors with id=" + id });
      });
};
// Update a Sensors by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Sensors.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Sensors with id=${id}. Maybe Sensors was not found!`
            });
          } else res.send({ message: "Sensors was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Sensors with id=" + id
          });
        });
};
// Delete a Sensor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Sensors.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Sensors with id=${id}. Maybe Sensors was not found!`
          });
        } else {
          res.send({
            message: "Sensors was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Sensors with id=" + id
        });
      });
};
// Delete all Sensors from the database.
exports.deleteAll = (req, res) => {
    Sensors.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Sensors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sensors."
      });
    });
};
