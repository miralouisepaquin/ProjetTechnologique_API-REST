const db = require("../models");
const Users = db.users;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mail) {
    res.status(400).send({ message: "Les champs ne peuvent être vide!" });
    return;
  }
  // Create a User
  const users = new Users({
    mail: req.body.mail,
    password: req.body.password,
	code: req.body.code,
	broker: req.body.broker
  });
  // Save User in the database
  users
    .save(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création du User."
      });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const mail = req.query.mail;
    var condition = mail ? { mail: { $regex: new RegExp(mail), $options: "i" } } : {};
    Users.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la recherche des Users."
        });
      });
};
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Impossible de trouver le User avec le id : " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Erreur lors de la recherche du User avec le id :=" + id });
      });
};
// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Les champs ne peuvent être vide lors de la modification!"
        });
      }
      const id = req.params.id;
      Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Ne peut modifier le User avec le id=${id}. Il se peut que le User n'existe pas!`
            });
          } else res.send({ message: "User modifié avec succès." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Erreur lors de la modification du User avec le id: " + id
          });
        });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Ne peut supprimer le User avec le id=${id}. Il se peut que le User n'existe pas!`
          });
        } else {
          res.send({
            message: "User supprimer avec succès!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ne peut supprimer le User avec le id: " + id
        });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};
