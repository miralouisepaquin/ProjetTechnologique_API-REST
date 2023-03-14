const db = require("../models");
const Logs = db.logs;
// Create and Save a new Logs
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Logs
  const logs = new Logs({
    date: req.body.date,
    description: req.body.description
  });
  // Save Logs in the database
  logs
    .save(logs)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Logs."
      });
    });
};
// Retrieve all Logs from the database.
exports.findAll = (req, res) => {
    const date = req.query.date;
    var condition = date ? { date: { $regex: new RegExp(date), $options: "i" } } : {};
    Logs.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Logs."
        });
      });
};
// Find a single Logs with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Logs.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Logs with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Logs with id=" + id });
      });
};
// Update a Logs by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Logs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Logs with id=${id}. Maybe Logs was not found!`
            });
          } else res.send({ message: "Logs was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Logs with id=" + id
          });
        });
};
// Delete a Logs with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Logs.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Logs with id=${id}. Maybe Logs was not found!`
          });
        } else {
          res.send({
            message: "Logs was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Logs with id=" + id
        });
      });
};
// Delete all Logs from the database.
exports.deleteAll = (req, res) => {
    Logs.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Logs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logs."
      });
    });
};
