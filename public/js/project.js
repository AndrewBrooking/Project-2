$(document).ready(() => {

    $(document).on("click", "#projectSubmit", (event) => {
        event.preventDefault();
        let newProject = {
            name: $("#projectNameInput").val().toString().trim(),
            desc: $("#projectDescInput").val().toString().trim(),
            img: $("#projectImgInput").val().toString().trim(),
            // userId: Something to be inputted. 
        }
        // TODO: Login user
        console.log(newProject)
        // TODO: post to database
        // $.post("/create", newProject).then((result) => {
        //     console.log(result);

        // });

    });


});

