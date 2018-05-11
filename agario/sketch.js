//BlockCatch
//Muhammad Sami Khan
//April 16, 2018

let locations, foodSpots;
let segmentSize;
let x, y, direction;
let numberOfSegments;
let state;
let speed;
let backgroundMusic;
let eatFoodSound;
let speedUpSound;
let deathSound;
let moveX;
let moveY;
let moveFood;
let currentY;
let timer = 200;
let backgroundGame;
let movePlayerX;
let movePlayerY;
let playerOne;

function preload() {
  backgroundGame = loadImage('images/background.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  numberOfSegments = 50;
  segmentSize = 10;
  direction = "right";
  speed = 1;
  moveX = width /2;
  moveY = height;
  moveFood = 2;
  locations = [];
  x = roundDownToNearestMultiple(moveX, segmentSize);
  y = roundDownToNearestMultiple(moveY, segmentSize);
  locations.push([x, y]);
  foodSpots = [];
  movePlayerX = windowWidth/2;
  movePlayerY = windowHeight/2;
}
function draw() {
  background(backgroundGame);

  if (state === "start") {
    startScreen();
  }

  else if (state === "game") {
    gameTime();
    spawnFood();
    displayFood();
    player();
    if (eatingFood() === true) {
      numberOfSegments+5;
      if (numberOfSegments === 80) {
        speed+1;
      }
      if (numberOfSegments === 120) {
        speed+1;
      }
      if (numberOfSegments === 190) {
        speed+1;
      }
      if (numberOfSegments === 200) {
        speed+1;
      }
    }
    displayScore();
  }
  else if (state === "dead") {
    deathScreen();
  }
}

function player(){
  strokeWeight(4);
  stroke(0);
  fill(100);
  ellipseMode(CENTER)
  ellipse(movePlayerX,movePlayerY,50,50);

  if (key === "a" || key === "A") {
    movePlayerX -=speed;
  }
  if (key === "d" || key === "D") {
    movePlayerX += speed;
  }
  if (key === "w" || key === "W") {
    movePlayerY -= speed;
  }
  if (key === "S" || key === "s") {
    movePlayerY += speed;
  }
}

function eatingFood() {
  for (let i = 0; i < foodSpots.length; i++) {
    if (foodSpots[i][0] >= movePlayerX-50 && foodSpots[i][1] >= movePlayerY-50 && foodSpots[i][0] <= movePlayerX+50 && foodSpots[i][1] <= movePlayerY+50 ) {
      // remove this food location from the array
      foodSpots.splice(i, 1);
      return true;
    }
  }
  return false;
}

function gameTime(){
  textSize(30);
  // text(timer/100, width/2, 100);
  textAlign(CENTER, CENTER);
  if (frameCount % 8 === 0 && timer >= 0) {
    timer--;
  }
}

function reachlow(){
  deathScreen();
  return reachlow();
}

function keyPressed() {
  if (state === "start") {
    state = "game";
  }
  else if (state === "game") {
    if (key === "a" || key === "A") {
      direction = "left";
    }
    if (key === "d" || key === "D") {
      direction = "right";
    }
    if (key === "w" || key === "W") {
      direction = "Up";
    }
    if (key === "S" || key === "s") {
      direction = "Down";
    }
  }
  else if (state === "dead") {
    if (key === "r" || key === "R") {
      setup();
    }
  }
}

function displayScore() {
  textSize(42);
  fill(255, 0, 0, 125);
  noStroke();
  text(numberOfSegments+" mass", 200, 40);
}

function roundDownToNearestMultiple(number, multiple) {
  let remainder = number % multiple;
  let answer = number - remainder;
  return answer;
}

function spawnFood() {
  // that's pretty much is a refreash rate and for me i used this us from destance between from food spawn and the other thing is
  // number 4 is usen for the amount of food spawn for one loops.
  if (frameCount % 60 === 0 && foodSpots.length < 10) {
    let x = roundDownToNearestMultiple(random(width), segmentSize);
    let y = roundDownToNearestMultiple(random(height), segmentSize);;
    foodSpots.push([x, y]);
  }
}

function displayFood() {
  for (let i = 0; i < foodSpots.length; i++) {
    noStroke();
    fill(255, 0, 0, 120);
    ellipse(foodSpots[i][0], foodSpots[i][1], segmentSize, segmentSize);
  }
}

function deathScreen() {
  textSize(42);
  textAlign(CENTER, CENTER);
  fill(0);
  text("DEAD!", width / 2, height / 2);
  text("Press R to restart.", width / 2, height / 2 + 55);
  fill(0);
}

function startScreen() {
  textSize(42);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Catch The Block Bofore Time Up", width / 2, height / 2);
  text("Use A,D to move.", width / 2, height / 2 + 55);
  text("Press any key to begin...", width / 2, height / 2 + 110);
}
