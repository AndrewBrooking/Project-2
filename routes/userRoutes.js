const {
    check,
    validationResult
} = require("express-validator");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

const usersUtil = require("../misc/usersUtil.js");

const saltRounds = 10;

module.exports = function (app, db) {

    app.get("/register", function (req, res) {
        res.render("registration", {});
    });

    app.post("/register", [
        // Validate username
        check(`username`).trim().escape().isLength({
            min: usersUtil.nameMinLength,
            max: usersUtil.nameMaxLength
        }),

        // Validate email
        check(`email`).trim().escape().normalizeEmail().isEmail().isLength({
            min: usersUtil.emailMinLength,
            max: usersUtil.emailMaxLength
        }),

        // Validate pasword
        check(`password`).trim().escape().isLength({
            min: usersUtil.passMinLength,
            max: usersUtil.passMaxLength
        }),

        // Validate pasword verification
        check(`passwordVerify`).trim().escape().isLength({
            min: usersUtil.passMinLength,
            max: usersUtil.passMaxLength
        }).custom((value, {
            req
        }) => (value === req.body.password))

    ], function (req, res) {

        // Validation error handling
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Return failure to POST status to client
            return res.status(422).json({
                errors: errors.array()
            });
        }

        // Obtain user input values
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        // Hash user password
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) throw err;

            // Insert new user into the database
            db.User.create({
                uName: username,
                pass: hash,
                email: email
            }).then(function (result) {
                // Log db record to server console
                console.log(result);

                // Return success status to client
                res.status(200).end();
            });
        });
    });
};