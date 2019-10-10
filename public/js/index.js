$(document).ready(() => {

    // Handle login submission
    $(document).on("click", "#loginUser", (event) => {
        event.preventDefault();

        let user = {
            username: ("" + $("#usernameLogin").val()).trim(),
            password: ("" + $("#passwordLogin").val()).trim()
        };

        $.post("/login", user).then((result) => {
            if (result === "sign-in-fail") {
                // TODO: Display error message
            }

            // Empty form values
            $("#usernameLogin").val("");
            $("#passwordLogin").val("");
        });
    });

    // Handle user registration submission
    $(document).on("click", "#registerUser", (event) => {
        event.preventDefault();

        console.log("Register clicked");

        // Obtain user input values
        let newUser = {
            username: $("#usernameInput").val().toString().trim().toLowerCase(),
            email: $("#emailInput").val().toString().trim().toLowerCase(),
            password: $("#passwordInput").val().toString().trim(),
            passwordVerify: $("#passwordVerify").val().toString().trim()
        };
        console.log(`index js newUser = ${JSON.stringify(newUser)}`)
        // POST request to server
        $.post("/register/new", newUser).then((result) => {
            console.log(result);
            
            // Display success/error message
            let message = $("span").text(result.msg);
            $("#regMessages").empty().append(message);

            if (!result.error) {
                // Empty form values
                $("#usernameInput").val("");
                $("#emailInput").val("");
                $("#passwordInput").val("");
                $("#passwordVerify").val("");
            }
        });
    });
});