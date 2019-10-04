$(document).ready(() => {

    // Handle user registration submission
    $(document).on("click", "#registerUser", (event) => {
        event.preventDefault();

        let newUser = {
            username: $("#usernameInput").val().toString().trim(),
            email: $("#emailInput").val().toString().trim(),
            password: $("#passwordInput").val().toString().trim()
        };

        $.post("/register", newUser).then((result) => {
            location.reload();
        });
    });
});