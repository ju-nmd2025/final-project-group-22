import Platform, { generatePlatforms } from "./platform.js";
import { drawCharacter } from "./character.js";

let gameState = {
  current: "start",
  states: {
    start: "start",
    play: "play",
    death: "death"
  }
};

let platforms = [];
let player;

function setup() {
    createCanvas(400, 600);
    textSize(18);
    textStyle(BOLD);

    // create platforms
    for (let i = 0; i < 12; i++) {
      let p = new Platform(Math.random() * (width - 60), height - i * 40);

      if (i === 5) {
        p.breakable = true; //the breaking platform
      }
      platforms.push(p);
    }

  // player
     player = {
      x: width / 2,
      y: height - 100,
      vy: 0
     };
  }

  function draw() {
    switch (gameState.current) {

      case gameState.states.start:
        drawStartScreen();
        break;

      case gameState.states.play:
        drawGame();
        break;

      case gameState.states.death:
      drawDeathScreen();
      break;

      default:
        console.error("Invalid game state");
    }
  }

// Start screen
  function drawStartScreen() {
    background(135, 206, 235); // Sky blue

    // start button
    if(mouseX > 150 && mouseX <235 && mouseY > 200 && mouseY <235){
        fill(0, 0, 0);
        cursor(HAND);
    } else {
        fill(231, 84, 128);
        cursor(ARROW);
    }

    rect(150, 200, 105, 35, 5);
    fill("white");
    text("Start game", 157, 222);
  }

  // Game
function drawGame() {
  background(135, 206, 235); // Sky blue

  player.vy += 0.6;
  player.y += player.vy;

  let scrollSpeed = 0;
  if (player.y < height / 2 && player.vy < 0) {
    scrollSpeed = 8;
  }

  for (let p of platforms) {
    p.y += scrollSpeed;
    p.update();
    p.draw();
  }
  
  drawCharacter(player.x, player.y);

  generatePlatforms(platforms, player.y, width, height);

// collisions
  for (let p of platforms) {
    if (
      !p.broken &&
      player.vy > 0 &&
      player.y + 30 <= p.y &&
      player.y + 30 >= p.y - player.vy &&
      player.x + 30 > p.x &&
      player.x - 30 < p.x + p.w
    ) {
      if (p.breakable) {
        if (!p.steppedOn) { //first time, normal jump
          player.vy = -12;
          p.steppedOn = true; //mark its used
      } else {
        // the second jump it breaks
        p.broken = true;
      }
    } else {
      player.vy = -12; //normal platform
    }
  }
} 

  // death condition
  if (player.y > height) {
    gameState.current = gameState.states.death;
  }

   if (keyIsDown(LEFT_ARROW)) player.x -= 5;
   if (keyIsDown(RIGHT_ARROW)) player.x += 5;
}


// death screen
function drawDeathScreen() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2);

  textSize(18);
  text("Click to restart", width / 2, height / 2 + 40);
  }

// Start game
function mouseClicked() {
  if (
    gameState.current === gameState.states.start &&
    mouseX > 150 &&
    mouseX < 255 &&
    mouseY > 200 &&
    mouseY < 235
  ) {
    gameState.current = gameState.states.play;
    return;
  }

  // restart after death
  if (gameState.current === gameState.states.death) {
    restartGame();
    gameState.current = gameState.states.play;
  }
}

function restartGame() {
  player.x = width / 2;
  player.y = height - 150; // starting a bit higher
  player.vy = 0;

  platforms = [];
  for (let i = 0; i < 12; i++) {
    let p = new Platform(Math.random() * (width - 60), height - i * 40);

    if (i === 4) {
      p.breakable = true;
    }

    platforms.push(p);
  }
}
