$(document).ready(() => {

    // Handle login submission
    $(document).on("click", "#loginUser", (event) => {
        event.preventDefault();

        let user = {
            username: $("#usernameLogin").val().toString().trim(),
            password: $("#passwordLogin").val().toString().trim()
        };

        $("#loginMsgDiv").empty();

        $.post("/login", user).then((result) => {
            if (result === "sign-in-fail") {
                $("#loginMsgDiv").append(
                    `<div class="alert alert-fail" role="alert">Username or password is incorrect</div>`
                );
            }
        });

        // Empty form values
        $("#usernameLogin").val("");
        $("#passwordLogin").val("");
    });

    // Handle user registration submission
    $(document).on("click", "#registerUser", (event) => {
        event.preventDefault();

        $("#msgDiv").empty();

        // Obtain user input values
        let newUser = {
            username: $("#usernameInput").val().toString().trim().toLowerCase(),
            email: $("#emailInput").val().toString().trim().toLowerCase(),
            password: $("#passwordInput").val().toString().trim(),
            passwordVerify: $("#passwordVerify").val().toString().trim()
        };

        // POST request to server
        $.post("/register", newUser).then((result) => {

            console.log(result);

            $("#msgDiv").append(`<div class="alert alert-${result.color}" role="alert">${result.msg}</div>`);

            // Empty form values
            $("#usernameInput").val("");
            $("#emailInput").val("");
            $("#passwordInput").val("");
            $("#passwordVerify").val("");
        });
    });
});