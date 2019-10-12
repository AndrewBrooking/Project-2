$(document).ready(() => {

    // Handle login submission
    $(document).on("click", "#loginUser", (event) => {
        event.preventDefault();

        // Clear error messages
        $("#loginMessages").empty();

        let user = {
            username: ("" + $("#usernameLogin").val()).trim(),
            password: ("" + $("#passwordLogin").val()).trim()
        };

        $.post("/login", user).then((result) => {
            if (result.error) {
                // Set success/error message
                let message = $("span").text(result.msg);

                // Set bg color to red
                message.addClass("red-bg");

                // Append error message
                $("#loginMessages").append(message);
            }

            // Empty form values
            $("#usernameLogin").val("");
            $("#passwordLogin").val("");

            location.reload();
        });
    });

    // Handle user registration submission
    $(document).on("click", "#registerUser", (event) => {
        event.preventDefault();

        // Obtain user input values
        let newUser = {
            username: ("" + $("#usernameInput").val()).trim().toLowerCase(),
            email: ("" + $("#emailInput").val()).trim().toLowerCase(),
            password: ("" + $("#passwordInput").val()).trim(),
            passwordVerify: ("" + $("#passwordVerify").val()).trim()
        };

        // POST request to server
        $.post("/register", newUser).then((result) => {
            // Set success/error message
            let message = $("span").text(result.msg);

            if (!result.error) {
                // Set bg color to green
                message.addClass("green-bg");

                // Empty form values
                $("#usernameInput").val("");
                $("#emailInput").val("");
                $("#passwordInput").val("");
                $("#passwordVerify").val("");
            } else {
                // Set bg color to red
                message.addClass("red-bg");
            }

            // Clear success/error message area then append the message
            //$("#regMessages").append(message);

            //console.log(message);

            // location.reload();
        });
        
    });
});