import { Character } from "./character.js";
import Platform, { generatePlatforms } from "./platform.js";

let player;
let platforms = [];
let canvasWidth = 400;
let canvasHeight = 600;
let gravity = 0.4;
let jumpStrength = -10;
let gameState = "start";

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  player = new Character (canvasWidth / 2, canvasHeight - 100);
  player.ySpeed = 0;

  //startplattformar
  platforms = [];
  for (let i = 0; i < 10; i++) {
    let p = new Platform(random(canvasWidth - 60), canvasHeight - i * 60);
    platforms.push(p);
  }
}


function draw() {
  // start screen
  if (gameState === "start") {
    drawStartScreen();
    return;
  }

  // death screen
  if (gameState === "death") {
    drawDeathScreen();
    return;
  }

  background(200, 220, 255);

  // karaktärens logik
  player.ySpeed += gravity;
  player.y += player.ySpeed; 

  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;

  // håller karaktären inom Canvas
  if (player.x < 0) player.x = canvasWidth;
  if (player.x > canvasWidth) player.x = 0;

  // Världen scrollas med spelaren
  if (player.y < canvasHeight / 2) {
    let diff = canvasHeight / 2 - player.y;
    player.y = canvasHeight / 2;

    for (let p of platforms) {
      p.y += diff;
    }
  }

  // platforms + collison
  for (let p of platforms) {
    p.draw();

    if (
      player.y + 25 >= p.y &&
      player.y + 25 <= p.y + p.h &&
      player.x + 25 >= p.x &&
      player.x - 25 <= p.x + p.w &&
      player.ySpeed > 0 &&
      !p.steppedOn
    ) {
      if (p.breakable) {
        if (!p.SteppedOn) {
          player.ySpeed = jumpStrength;
          p.steppedOn = true;
        } else {
          p.broken = true;
        }
      } else {
        player.ySpeed = jumpStrength;
      }
    }
    player.draw();
  }

  // nya plattformar
generatePlatforms(platforms, player.y, canvasWidth, canvasHeight / 2);

// create the player
player.draw();

// Game Over
  if (player.y > canvasHeight + 50) {
    gameState = "death";
  }
}


function mouseClicked() {
  // start game
if (
    gameState === "start" &&
    mouseX > 150 &&
    mouseX < 255 &&
    mouseY > 200 &&
    mouseY < 235
  ) {
    gameState = "play";
    cursor(ARROW);
  }

  // restart game
  else if (gameState === "death") {
    setup();
    gameState = "play";
  }
} 

// Start screen
function drawStartScreen() {
    background(135, 206, 235); // Sky blue
    fill(231, 84, 128);
    rect(150, 200, 105, 35, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Start game", 157, 222);
  }  

  // death
function drawDeathScreen() {
    background(0);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Game Over", width / 2, height / 2);
    textSize(18);
    text("Click to restart", width / 2, height / 2 + 40);
  }
