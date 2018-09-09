// gifButtons array
var gifButtons = ['Its Always Sunny in Philadelphia', 'Archer', 'Bobs Burgers', 'Parks and Recreation', '30 Rock', 'Rick and Morty', 'Simpsons', 'Captain Planet'];

// *****Functions*****
// Function to create/display array of buttons
function renderButtons() {
    // If page is refreshed remove buttons created after previous page session
    $('#buttons-view').empty();
    // For loop iterating through the gifButtons array
    for (var i = 0; i < gifButtons.length; i++) {
        // Create buttonElement variable
        var buttonElement = $('<button>');
        // Add class 'gif' to buttonElement
        buttonElement.addClass('gif');
        // Adds 'data-name' attribute assigning it an index in the gifButtons array
        buttonElement.attr('data-name', gifButtons[i]);
        // Adds the literal text to the button
        buttonElement.text(gifButtons[i]);
        // Attachs the buttonElement variable to the buttons-view id and display in dom
        $('#buttons-view').append(buttonElement);
    }
};

// Function to add a literal button when the add gif button is clicked
$('#add-gif').on('click', function() {
    // This function will stop the entire page from refreshing
    event.preventDefault();
    // Creates gifInput variable from the user input, trimming the spaces from the ends of the text
    var gifInput = $('#gif-input').val().trim();
    // Adds the gifInput text to the gifButtons array
    gifButtons.push(gifInput);
    // Calls the renderButtons function to display the literal button
    renderButtons();
    // Empties the input field after click event
    $('#gif-input').val('');
});

// Function to display gif and info
function displayGif() {
    // Remove any gifs currently displayed
    $('#gifs-view').empty();
    // Retrieve the data-name attribute associated with each button on the page
    var gif = $(this).attr('data-name');
    // Build url using Giphy API documentation
    // Set the limit parameter to 10 and the rating parameter to 'r'
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&limit=10&rating=r&api_key=2I9JTEcFloMIuOJYGm6FdQHrfBA7qtKH';
    console.log(queryURL);

    // Create AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        // Loop through JSON and retrieve the rating and gif url for all 10 results
        for (var i = 0; i < response.data.length; i++) {
            // Create div element
            var gifDiv = $('<div>');
            // Append the rating
            gifDiv.html('<p>Rating: ' + response.data[i].rating + '</p>');
            // Create img element
            var gifImg = $('<img>');
            // Add src attr to hold still img url
            gifImg.attr('src', response.data[i].images.fixed_height.url);
            // Add data-still attr to hold still img url
            gifImg.attr('data-still', response.data[i].images.fixed_height_still.url);
            // Add data-animate attr to hold moving img url
            gifImg.attr('data-animate', response.data[i].images.fixed_height.url);
            // Add data-state attr to toggle between still and animate
            gifImg.attr('data-state', 'animate');
            // Add a gif class
            gifImg.attr('id', 'gif');              
            // Attach the rating and img elements to gifs-view id and display in dom
            $('#gifs-view').append(gifImg, gifDiv);
        }    
    });    
};

// *****Listeners*****
// Function to toggle between still and animate states when user clicks on gif image
$(document).on('click', '#gif', function() {
    // Retrieve the value that is currently stored in the data-state attr
    var state = $(this).attr('data-state');
    console.log(state);
    // If/else statements to toggle between still and animate states
    // If the current state is 'still' - change the values to animate upon click
    if (state === 'still') {
        // Toggle the src attr to the animate url
        $(this).attr('src', $(this).attr('data-animate'))
        // Toggle the data-state attr to animate
        $(this).attr('data-state', 'animate')
    }
    // If the current state is 'animate' - change the values back to still upon click
    else if (state === 'animate') {
        // Toggle the src attr to the still url
        $(this).attr('src', $(this).attr('data-still'))
        // Toggle the data-state attr to still
        $(this).attr('data-state', 'still');
    }   
})

// Function that will respond to our dynamically created buttons with class of gif
$(document).on('click', '.gif', displayGif);
renderButtons();