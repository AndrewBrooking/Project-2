const {
    check,
    validationResult
} = require("express-validator");

const bcrypt = require("bcrypt");
const usersUtil = require("../misc/usersUtil.js");

const saltRounds = 10;

module.exports = function (app, db) {

    app.get("/register", function (req, res) {
        res.render("registration", {
            title: "Registration"
        });
    });

    app.post("/register", [
        // Validate username
        check(`username_input`).trim().escape().isLength({
            min: usersUtil.nameMinLength,
            max: usersUtil.nameMaxLength
        }),

        // Validate email
        check(`email_input`).trim().escape().normalizeEmail().isEmail().isLength({
            min: usersUtil.emailMinLength,
            max: usersUtil.emailMaxLength
        }),

        // Validate pasword
        check(`password_input`).trim().escape().isLength({
            min: usersUtil.passMinLength,
            max: usersUtil.passMaxLength
        }),

        // Validate pasword verification
        check(`password_verify`).trim().escape().custom((value, {
            req
        }) => (value === req.body.password_input))

    ], function (req, res) {

        // Validation error handling
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
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
                // Temporarily return the json data for testing
                console.log(result);
                res.json(result);
            });
        });
    });
};