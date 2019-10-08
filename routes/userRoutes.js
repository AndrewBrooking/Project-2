// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

const usersUtil = require("../misc/usersUtil.js");

const saltRounds = 10;

module.exports = function (app, db) {

    app.get("/register", function (req, res) {
        res.render("registration", {});
    });

    app.post("/register", function (req, res) {
        // Obtain user input values
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const passwordVerify = req.body.passwordVerify

        let vFailed = false;

        // Validate username length
        if (username.length < usersUtil.nameMinLength || username.length > usersUtil.nameMaxLength) {
            vFailed = true;
            res.json({
                msg: `Username must be between ${usersUtil.nameMinLength} and ${usersUtil.nameMaxLength} characters`,
                color: "danger"
            });
        }

        // Validate username does not have special characters
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(username)) {
            vFailed = true;
            res.json({
                msg: `Username cannot contain any special characters`,
                color: "danger"
            });
        }

        // Validate email length
        if (email.length < usersUtil.emailMinLength || email.length > usersUtil.emailMaxLength) {
            vFailed = true;
            res.json({
                msg: `Email address must be between ${usersUtil.emailMinLength} and ${usersUtil.emailMaxLength} characters`,
                color: "danger"
            });
        }

        // Validate email format
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            vFailed = true;
            res.json({
                msg: `Email address provided is not valid`,
                color: "danger"
            });
        }

        // Validate password length
        if (password.length < usersUtil.passMinLength || password.length > usersUtil.passMaxLength) {
            vFailed = true;
            res.json({
                msg: `Password must be between ${usersUtil.passMinLength} and ${usersUtil.passMaxLength} characters`,
                color: "danger"
            });
        }

        // Validate password and password verification match
        if (password !== passwordVerify) {
            vFailed = true;
            res.json({
                msg: `Passwords do not match`,
                color: "danger"
            });
        }

        if (!vFailed) {
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
                    res.status(200).json({
                        msg: "Success!",
                        color: "success"
                    });
                });
            });
        }
    });
};