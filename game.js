// alert("this is a testing alert!");

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function nextSequence() {
  level += 1;
  userClickedPattern = [];
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  // console.log("nextSequence()!",randomChosenColor);
  $("." + randomChosenColor).fadeOut(200).fadeIn(200);

  // new Audio("sounds/"+randomChosenColor+".mp3").play();
  playSound(randomChosenColor);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  console.log("." + currentColor);
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(curentLevel) {
  console.log("curentLevel: " + curentLevel);
  console.log("gamePattern: " + gamePattern);
  console.log("userClickedPattern: " + userClickedPattern);
  if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {
    console.log("match!!!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("h1").text("Game Over, Press Me to Restart.");
    startOver();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$("h1").on("click",function(){
  if (gameStarted === false) {
    $("h1").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  var userChosenColor = this.getAttribute("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);


  // nextSequence();

});

// $(document).on("keypress", function() {
//   if (gameStarted === false) {
//     $("h1").text("Level " + level);
//     gameStarted = true;
//     nextSequence();
//   }
// });
