$(document).ready(function () {
    var dances = ["Disco", "Bollywood Dance", "Tap Dance", "The Twist", "Break Dancing", "Flamenco Dance", "Gangnam Style", "Belly Dance", "Salsa", "Line Dance", "Waltz", "Flossing"];
    function generateButtons() {
        $(".buttons-container").empty();
        for (var i = 0; i < dances.length; i++) {
            var button = $("<button>"); //<button> </button>
            button.addClass("top-button"); //<button class="top-button"> </button>
            button.attr("data-type", dances[i]); //<button class="top-button" data-type="The Twist"> </button>
            button.text(dances[i]); //<button class="top-button" data-type="dance"> Topic</button>
            $(".buttons-container").append(button);
        }
    }
    generateButtons();
    $("#add-dance").on("click", function (e) {
        e.preventDefault();
        var newDances = $("#dance-input").val().trim();
        console.log("new dance: " + newDances);
        dances.push(newDances);
        generateButtons();
        $("#dances-input").val("")

    })

    $(document).on("click", ".top-button", function () {
        $(".gify-container").empty();
        var buttonName = $(this).attr("data-type");
        var queryString = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=yrFpx3WVLoEmze015iNhTNv3JXIKv2Kd&limit=10";
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (res) {
            console.log(res)
            var results = res.data;
            for (var i = 0; i < results.length; i++) {
                var danceDiv = $("<div class='dance-item' >");
                var animatedURL = results[i].images.fixed_height.url;
                var stillURL = results[i].images.fixed_height_still.url;

                var danceImage = $("<img>");
                danceImage.attr("src", stillURL);
                danceImage.addClass("dance-image");
                danceImage.attr("data-state", "still");
                danceImage.attr("data-animate", animatedURL);
                danceImage.attr("data-still", stillURL);

                //Append the GIF Rating
                var ratingDiv = $("<div>");
                ratingDiv.text("Rating: " + results[i].rating);
                // danceImage.prepend(ratingDiv);

                danceDiv.append(danceImage);
                
                $(".gify-container").append(ratingDiv);
                $(".gify-container").append(danceDiv);



            }
        })
    })

    // Toggle between Still and Animated GIF's
    $(document).on("click", ".dance-image", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }
        if (state == "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }

    });

})