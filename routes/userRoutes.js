const usersUtil = require("../misc/usersUtil.js");

module.exports = function (app, db) {

    app.get("/register", function (req, res) {
        res.render("registration", {
            title: "Registration"
        });
    });

    app.post("/register", function (req, res) {
        // Validate user inputs
        req.checkBody(
            `username`,
            `Username field cannot be empty.`
        ).notEmpty();

        req.checkBody(
            `username`,
            `Username must be between ${userUtils.nameMinLength}-${userUtils.nameMaxLength} characters long.`
        ).len(userUtils.nameMinLength, userUtils.nameMaxLength);

        req.checkBody(
            `email`,
            `The email you entered is invalid, please try again.`
        ).isEmail();

        req.checkBody(
            `email`,
            `Email address must be between ${userUtils.emailMinLength}-${userUtils.emailMaxLength} characters long.`
        ).len(4, 100);

        req.checkBody(
            `password`,
            `Password must be between ${userUtils.passMinLength}-${userUtils.passMaxLength} characters long.`
        ).len(userUtils.passMinLength, userUtils.passMaxLength);

        req.checkBody(
            `password`,
            `Password must include one lowercase character, one uppercase character, a number, and a special character.`
        ).matches(userUtils.passRegex, `i`);

        req.checkBody(
            `passwordMatch`,
            `Password must be between ${userUtils.passMinLength}-${userUtils.passMaxLength} characters long.`
        ).len(userUtils.passMinLength, userUtils.passMaxLength);

        req.checkBody(
            `passwordMatch`,
            `Passwords do not match, please try again.`
        ).equals(password);

        const errors = req.validationErrors();

        if (errors) {
            console.log(`errors: ${JSON.stringify(errors)}`);

            return res.render(`register`, {
                title: `Registration Error - Try Again`
            });
        }

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
};