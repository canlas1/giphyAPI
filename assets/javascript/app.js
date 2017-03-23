$(document).ready(function() {
        console.log("ready!");
        
//##########################################
        
        // Global Variables
//#############################################
        var carArr = ["Porsche", "Ford", "Mercedes", "GMC", "Lexus", "BMW"];
        console.log(carArr);
        // Buttons Variables
//##########################################################
        // This is the button to send a request to API Giphy tied to ID on HTML
        var submit = $("#submit");
        // This is the div that holds the car buttons tied to ID on HTML
        var buttons = $("#buttons");
        // This is the div that holds the result from clicking on the car buttons
        var results = $("#results");
        // This will be replaced with a new value <~~~~~~~~~~~~~~~~~~~~~~~~`
//##########################################    
    // create function to render buttons to the page
    function renderButtons() {
        //empty contents of the dynamically created button element
        buttons.empty();
        //loop through the set array
        for (var i = 0; i < carArr.length; i++) {
            var a = $("<button>")
            a.addClass("gif"); // Added a gif (string i set) class 
            a.text(carArr[i]); // Provided the initial button text
            buttons.append(a); // Added/appened the button to the HTML
            console.log(carArr[i]);
        } //for loop close
    } // function renderButton close   

//##########################################
    //This function handles events where one button is clicked and dynamically created button on HTML
    $("#buttons").on("click", ".gif", function displayCarGiphies() {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        //should log "this" which is when handle #buttons
        console.log($(this).text());
        //new local variable for "this"
        var selection = $(this).text();
        // should log input selection
        console.log(selection);
        // concatinate a new URL string
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=dc6zaTOxFJmzC";
        console.log(queryURL);
        //issue and AJAX call to the Giphy API with concatinated URL
        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function(response) {

            //empty the results the the response <~~~~~~
            results.empty();
            //log all of the data in the API then parse from here
            console.log(response.data);
            // For loop set max to 10 images and index 10
            for (var i = 0; i < 10; i++) {
                //create a new dynamic div
                var div = $("<div>");
                // assign class attribute to the div from parsed API
                div.attr("class", "imageHolder");
                // assign id attribute to the div from parsed API
                div.attr("id", response.data[i].id);
                // create a new var with original URL gif
                var gifOri = $("<img>");
                //create a new var with still URL image
                var picStill = $("<img>");
                picStill.attr("class", "img-responsive");
                gifOri.attr("class", "img-responsive");
                //parse through the API source of the Object to get original
                gifOri.attr("src", response.data[i].images.original.url);
                //parse through the API source of the Object to get the Stil
                picStill.attr("src", response.data[i].images.original_still.url);
                
                //<~~~~~~~~~~~~~~~
                gifOri.css("display", "none");
                div.append(gifOri);
                div.append(picStill);
                results.append(div);
            }
        });
    });
    //call back to the renderButton step1
    renderButtons();
    
    //this function is to submit and push the item into the original array
    submit.on('click', function GifBtns() {
        newCarInput = $("#search").val().trim();
        carArr.push(newCarInput);
        console.log(carArr);
        renderButtons();
    });
    //<~~~~~~~~
    $("#results").on("click", ".imageHolder", function() {
        console.log("this better work!");
        //<~~~~~~~~~~
        $(this).find(".img-responsive").toggle();
        console.log(this);

    });


}); // !!!!!!!!!!!!!!!!!!!!END OF!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! $(document).ready(function()
