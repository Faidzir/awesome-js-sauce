
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;

$(document).on("keypress",function(event){

  if (level === 0){
    level++;
    $("h1").text("level " + level);
    nextSequence();
  }
 
});

function nextSequence() {

  $("h1").text("level " + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  
  var i = 0;
  function myLoop(){
    setTimeout(function(){
      console.log(i)
      playSound(gamePattern[i]);
      animatePress(gamePattern[i]);
      i++;
      if(i < gamePattern.length){
        myLoop();
      }
    },500)
      
  }
  myLoop();

}
// button-click check
$(".btn").on("click",function(){
  
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
  
}

function checkAnswer(currentLevel){

  console.log(currentLevel);
  console.log(userClickedPattern);
  console.log(gamePattern);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("true");

    if (currentLevel === gamePattern.length-1){
      setTimeout(function(){
        userClickedPattern = [];
        nextSequence();
      },1000);
    }

  }else{

    console.log("false");
    
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    
    setTimeout(function(){

      $("body").removeClass("game-over");
      
    },200);

    startOver();
  }
  
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}