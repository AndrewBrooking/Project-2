// $(document).ready(() => {

//     $(document).on("click", "#loginUser", (event) => {
//         event.preventDefault();

//         console.log("Login clicked");

//         // TODO: Login user

//         // Empty form values
//         $("#usernameLogin").val("");
//         $("#passwordLogin").val("");
//     });

//     // Handle user registration submission
//     $(document).on("click", "#registerUser", (event) => {
//         event.preventDefault();

//         $("#msgDiv").empty();

//         // Obtain user input values
//         let newUser = {
//             username: $("#usernameInput").val().toString().trim(),
//             email: $("#emailInput").val().toString().trim(),
//             password: $("#passwordInput").val().toString().trim(),
//             passwordVerify: $("#passwordVerify").val().toString().trim()
//         };

//         // POST request to server
//         $.post("/register", newUser).then((result) => {

//             console.log(result);

//             $("#msgDiv").append(`<div class="alert alert-${result.color}" role="alert">${result.msg}</div>`);

//             // Empty form values
//             $("#usernameInput").val("");
//             $("#emailInput").val("");
//             $("#passwordInput").val("");
//             $("#passwordVerify").val("");
//         });
//     });
// });
