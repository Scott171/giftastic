
var actors = ["Steve Carrell", "Amy Poehler", "Hugh Jackman", "Jennifer Lawerence", "Will Smith", "Ryan Reynolds", "Chris Pratt", "Anna Faris"];


$(document).ready(function () {
 renderButtons();
    function renderButtons() {

        $("#buttons-view").empty();


        for (var i = 0; i < actors.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("actor");
            newButton.addClass("btn btn-primary");
            newButton.attr("data-name", actors[i]);
            newButton.text(actors[i]);
            $("#buttons-view").append(newButton);
        }
    }
    $("#add-actor").on("click", function (event) {
        event.preventDefault();

        var actor = $("#actor-input").val().trim();

        actors.push(actor);

        renderButtons();


    });
   

    $(document).on("click", "button",getInfo)
    function getInfo(){
       var subject = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            subject + "&api_key=dwh9lfQ2A9SkBC6q2nFhN7oVHxC99SFr&limit=10";
            $("#mainImages").empty();
        $.ajax({
            url: queryURL,
            method: "GET"

        })
            .then(function (response) {
              
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var personImage = $("<img>");
                        personImage.attr("src", results[i].images.fixed_height_still.url);
                        personImage.attr("data-still", results[i].images.fixed_height_still.url);
                        personImage.attr("data-animate", results[i].images.fixed_height.url);
                        personImage.attr("data-state", "still");
                        personImage.addClass("gif");
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        $("#mainImages").prepend(gifDiv);
                        console.log(response);




                    }
                }
           

            });
    }
  

    $("#mainImages").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }


        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})