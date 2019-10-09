// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
const usersUtil = require("../misc/usersUtil.js");

const saltRounds = 10;

module.exports = function (app, db) {

    app.get("/register", function (req, res) {
        return res.render("registration", {});
    });

    app.post("/logout", function (req, res) {
        req.session.destroy(function (err) {
            if (err) throw err;

            return res.redirect("/");
        });
    });

    app.post("/login", function (req, res) {
        // Obtain user inputs
        let username = ("" + req.body.username).trim().toLowerCase();
        let password = ("" + req.body.password).trim();

        // Find a matching entry
        db.User.findOne({
            where: {
                uName: username
            }
        }).then(function (user) {
            if (user == undefined || user == null) {
                console.log("Could not login user: " + username);
                return res.status(400);
            }

            // Compare passwords
            bcrypt.compare(password, user.pass, function (err, result) {
                if (err) throw err;

                if (result) {
                    console.log("Successful login: " + username);

                    // Set session variables
                    req.session.userID = user.id;

                    // Reload homepage with user logged in
                    return res.redirect("/");
                } else {
                    console.log("Could not login user: " + username);
                    return res.status(400);
                }
            });
        });
    });

    app.post("/register/new", function (req, res) {
        // Obtain user input values
        const newUser = {
            uName: ("" + req.body.username).trim().toLowerCase(),
            pass: ("" + req.body.password).trim(),
            email: ("" + req.body.email).trim().toLowerCase()
        };

        const passwordVerify = ("" + req.body.passwordVerify).trim();

        // Validate username
        if (!validateUsername(newUser.uName)) {
            return res.json({
                error: true,
                msg: `Username does not meet length requirements or contains special characters.`
            });
        }

        // Validate email
        if (!validateEmail(newUser.email)) {
            return res.json({
                error: true,
                msg: `Email address does not meet length requirements or is not a valid email format.`
            });
        }

        // Validate password
        if (!validatePassword(newUser.pass, passwordVerify)) {
            return res.json({
                error: true,
                msg: `Password does not meet length requirements or does not match with the password confirmation.`
            });
        }

        // Validate username is not already in database
        usernameExists(newUser.uName, function (usernameTaken) {
            if (usernameTaken) {
                return res.json({
                    error: true,
                    msg: `Username already in use.`
                });
            } else {
                // Validate email is not already in database
                emailExists(newUser.email, function (emailTaken) {
                    if (emailTaken) {
                        return res.json({
                            error: true,
                            msg: `Email already in use.`
                        });
                    } else {
                        try {
                            // Hash user password
                            bcrypt.hash(newUser.pass, saltRounds, function (err, hash) {
                                if (err) throw err;

                                newUser.pass = hash;

                                // Insert new user into the database
                                db.User.create(newUser).then(function (result) {
                                    // Log db record to server console
                                    console.log("New user registered", newUser.uName, newUser.email);

                                    req.session.userID = result.id;

                                    // Return success status to client
                                    return res.json({
                                        error: false,
                                        msg: "Success!"
                                    });
                                });
                            });
                        } catch (error) {
                            console.log(error);

                            return res.json({
                                error: true,
                                msg: `Server Error: Could not register new user.`
                            });
                        }
                    }
                });
            }
        });
    });

    function validateUsername(username) {
        return (username.length > usersUtil.nameMinLength ||
                username.length < usersUtil.nameMaxLength) &&
            !(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(username));
    }

    function validateEmail(email) {
        return (email.length > usersUtil.emailMinLength ||
                email.length < usersUtil.emailMaxLength) &&
            (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    }

    function validatePassword(password, passwordVerify) {
        return (password.length > usersUtil.passMinLength ||
                password.length < usersUtil.passMaxLength) &&
            (password === passwordVerify);
    }

    function usernameExists(username, cb) {
        db.User.count({
            where: {
                uName: username
            }
        }).then(function (uCount) {
            cb(uCount != 0);
        });
    }

    function emailExists(email, cb) {
        db.User.count({
            where: {
                email: email
            }
        }).then(function (eCount) {
            cb(eCount != 0);
        });
    }
};