// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
const usersUtil = require("../misc/usersUtil.js");
const saltRounds = 10;

module.exports = function (app, db) {

    app.post("/login", function (req, res) {
        let username = req.username;
        let password = reg.password;

        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) throw err;

            db.findOne({
                where: {
                    username: username,
                    password: hash
                }
            }).then(function (user) {
                res.json(user);
            });
        });
    });

    app.post("/register", function (req, res) {
        // Obtain user input values
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        const passwordVerify = req.body.passwordVerify;

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
        if (newUser.password !== passwordVerify) {
            vFailed = true;
            return res.json({
                msg: `Passwords do not match`,
                color: "danger"
            });
        }

        // Validate username is not already in database
        db.User.count({
            where: {
                username: newUser.username
            }
        }).then(function (uCount) {
            if (uCount != 0) {
                vFailed = true;
                return res.json({
                    msg: `Username already in use`,
                    color: "danger"
                });
            }

            // Validate email is not already in database
            db.User.count({
                where: {
                    email: newUser.email
                }
            }).then(function (eCount) {
                if (eCount != 0) {
                    vFailed = true;
                    return res.json({
                        msg: `Email already in use`,
                        color: "danger"
                    });
                }

                // Create new user if no validations failed
                if (!vFailed) {
                    // Hash user password
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        if (err) throw err;

                        // Insert new user into the database
                        db.User.create(newUser).then(function (result) {
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
        });
    });
};