let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let randomChosenColour = "";

let level = 0;

//this create the sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //this is the flash animation for the selected colour to press
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColours[randomNumber]);
    level += 1;
    $("#level-title").text("Level " + level);
    //this reset the user Pattern so to remember the full array
    userClickedPattern = [];
}

//this function is for the audio trigger
function playSound(name) {
    //this is the audio based on the button to press
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

//this is the animatePress() function
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

//this check the Answer of the user to the game
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

//Start Over function
function startOver() {
    level = 0;
    gamePattern = [];
}


//store the id of the button clicked
$(".btn").click(function() {
    var userChosenColour = ($(this).attr("id"));
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});


//detect when the user does press any key of the keyboad
$(document).keypress(function() { 
    if (level == 0) {
        nextSequence() 
    } 
});