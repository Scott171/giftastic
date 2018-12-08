
 var actors = ["Steve Carrell", "Amy Poehler","Hugh Jackman", "Jennifer Lawerence", "Will Smith","Ryan Reynolds","Chris Pratt","Anna Faris"];

 $(document).ready(function() {
     
function renderButtons() {

    $("#buttons-view").empty();


    for (var i = 0; i < actors.length; i++) {
        var a = $("<button>");
        a.addClass("actor");
        a.attr("data-name", actors[i]);
        a.text(actors[i]);
        $("#buttons-view").append(a);
    }
  }
  renderButtons();

$(document).on("click", "button", function() {
    subject=$(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    subject + "&api_key=dwh9lfQ2A9SkBC6q2nFhN7oVHxC99SFr&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    })
    .then(function(response) {
        $("#gifs-appear-here").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(personImage);
                $("#gifs-appear-here").prepend(gifDiv);
                console.log(response);
                
            }
        }
    });
});
$(document).on("click", "#add-actor", function(event) {
    event.preventDefault();
   
    var actor = $("#actor-input").val().trim();

    actors.push(actor);

    renderButtons();

    
  });
  
});