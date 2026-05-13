var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentlevel) {
    if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) {
            console.log("User completed the level!");
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
      var  audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);

   $("h1").text("GameOver, Press Any Key to Restart");
   startOver();
            }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomnumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
    if (!started) {
        started = true;
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

function startOver(){
 level = 0 ;
 gamePattern = [];
 started = false ;


}