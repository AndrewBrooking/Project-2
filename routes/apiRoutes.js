var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post("/createUser", (req, res) => {
    //set user (minimal data added right now for testing)
    createUser(req.body.username, req.body.email);
    //creates a user when sent a post request here
    function createUser(userName, email) {
      db.User.create({ uName: userName, pass: "test", email: email });
    }
    db.User.findAll().then(users => {
      res.send(users)
    })
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
