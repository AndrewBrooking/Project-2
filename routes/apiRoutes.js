const expressValidator = require('express-validator');
const db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post("/register", function (req, res) {
    // Validate user inputs
    userValidation(req, res);

    // Obtain user input values
    const username = req.body.username_input;
    const email = req.body.email_input;
    const password = req.body.password;

    // Insert new user into the database
    db.User.create({
      uName: username,
      pass: password,
      email: email
    }).then(function (result) {
      // Temporarily return the json data for testing
      res.json(result);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  function userValidation(req, res) {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);

    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long.').len(4, 100);

    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*)(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'
    );

    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(password);

    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors: ${JSON.stringify(errors)}`);

      res.render('register', {
        title: 'Registration Error - Try Again'
      });
    }
  }
};