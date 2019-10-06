$(document).ready(() => {
  $(".btn-secondary").on("click", function() {
    console.log("eyy wanka");
    $(".modal").attr("style", "display: none;");
  });

  $(".btn-primary").on("click", function() {
    let newUser = {
      username: $("#usernameInput")
        .val()
        .toString()
        .trim(),
      email: $("#emailInput")
        .val()
        .toString()
        .trim(),
      password: $("#passwordInput")
        .val()
        .toString()
        .trim(),
      passwordVerify: $("#passwordVerify")
        .val()
        .toString()
        .trim()
    };
    console.log(newUser);

//ANDREW WORK UR MAGIC HERE

    /*$.post("/test", newUser).then(result => {
      console.log(result);

      $("#msgDiv").append(
        `<div class="alert alert-${result.color}" role="alert">${result.msg}</div>`
      );

      // Empty form values
      $("#usernameInput").val("");
      $("#emailInput").val("");
      $("#passwordInput").val("");
      $("#passwordVerify").val("");
    });*/
  });
});
