import Platform, { generatePlatforms } from "./platform.js";
import { Character } from "./character.js";

let player;
let platforms = [];
let gameState = "start";

function setup() {
  createCanvas(400, 600);
  textSize(18);
  textStyle(BOLD);
  resetGame();
}

function resetGame() {
  player = new Character(width / 2, height - 100);
  
  platforms = [];
  // skapa startplattformar
  for (let i = 0; i < 12; i++) {
    platforms.push(new Platform(Math.random() * (width - 60), height - i * 50));
  }
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    drawGame();
  }
}

function drawStartScreen() {
  background(135, 200, 235); // sky blue

  if (mouseX > 150 && mouseX < 235 && mouseY > 200 && mouseY < 235) {
    fill(200, 50, 100);
    cursor(HAND);
  } else {
    fill(231, 84, 128);
    cursor(ARROW);
  }

  rect(150, 200, 105, 35, 5);
  fill("white");
  text("Start game", 157, 224);
}

function drawGame() {
  background(135, 200, 235); // Sky blue

  // gravitation and movement
  player.ySpeed += 0.6;
  player.y += player.ySpeed;

  // scroll when player moves up
  if (player.y < height / 2) {
    let diff = height / 2 - player.y;
    player.y = height / 2;
    for (let p of platforms) {
      p.y += diff;
    }
  }

// draw platforms
for (let p of platforms) {
  p.update();
  p.draw();
}

// character
player.draw();

//generate new platforms
generatePlatforms(platforms, player.y, width, height);

// kollisionshantering
for (let p of platforms) {
    if (
      player.ySpeed > 0 && 
      player.x + 30 > p.x &&
      player.x - 30 < p.x + p.w &&
      player.y + 30 > p.y &&
      player.y + 30 < p.y + p.h
    ) {
      player.ySpeed = -12;
    }
  }

  // styrning
  if (keyIsDown(LEFT_ARROW)) player.x -= player.xSpeed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.xSpeed;

  // Gör att gubben kan åka ut på ena sidan och åka in på andra
  if (player.x > width) player.x = 0;
  if (player.x < 0) player.x = width;

  // game over logic
  if (player.y > height) {
    gameState = "start";
    resetGame();
  }
}

// Start game
function mouseClicked() {
  if (
    gameState === "start" &&
    mouseX > 150 &&
    mouseX < 235 &&
    mouseY > 200 &&
    mouseY < 235
  ) {
    gameState = "play";
  }
}