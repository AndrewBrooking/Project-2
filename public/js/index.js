$(document).ready(() => {

    console.log("Loaded");

    $("#register_user").on("click", (event) => {
        event.preventDefault();

        let newUser = {
            username: $("#username_input").val().toString().trim(),
            email: $("#email_input").val().toString().trim(),
            password: $("#password_input").val().toString().trim(),
            passwordVerify: $("#password_verify").val().toString().trim()
        };

        console.log(newUser);

        $.post("/register", newUser).then((result) => {
            //console.log(result);
            location.assign("/");
        });
    });
});