$(document).ready(() => {

    $(document).on("click", "#register_user", (event) => {
        event.preventDefault();

        let newUser = {
            username: $("#username_input").val().toString().trim(),
            email: $("#email_input").val().toString().trim(),
            password: $("#password_input").val().toString().trim()
        };

        $.post("/register", newUser).then((result) => {
            location.assign("/");
        });
    });
});
