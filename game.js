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

  // create the player
  player = new Character (canvasWidth / 2, canvasHeight - 100);
  player.ySpeed = 0;

  //starting platforms
  platforms = [];
  for (let i = 0; i < 10; i++) {
    let p = new Platform(random(canvasWidth - 60), canvasHeight - i * 60);
    platforms.push(p);
  }
}


function draw() {
  background(200, 220, 255);

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

  // the characters logic
  player.ySpeed += gravity;
  player.y += player.ySpeed; 

  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;

  // keep the character inside the canvas
  if (player.x < 0) player.x = canvasWidth;
  if (player.x > canvasWidth) player.x = 0;

  // the world scrolling
  if (player.y < canvasHeight / 2) {
    let diff = canvasHeight / 2 - player.y;
    player.y = canvasHeight / 2;
    for (let p of platforms) {
      p.y += diff;
    }
  }

  // platforms + collison
  for (let p of platforms) {
    p.update();
    p.draw();

    if (
      player.y + 25 >= p.y &&
      player.y + 25 <= p.y + p.h &&
      player.x + 25 >= p.x &&
      player.x - 25 <= p.x + p.w &&
      player.ySpeed > 0
    ) {
      if (p.type === 'breakable') {
        p.broken = true;
        player.ySpeed = jumpStrength;
      } else if (p.type === 'singleUse') {
        if (!p.steppedOn) {
          player.ySpeed = jumpStrength;
          p.steppedOn = true;
        }
      } else {
        player.ySpeed = jumpStrength;
      }
    }
  }
  
  // drawing the player
  player.draw();

// generating new platforms
  generatePlatforms(platforms, player.y, canvasWidth, canvasHeight);

// game over
  if (player.y > canvasHeight + 50) {
  gameState = "death";
  }
}

// "click here to restart"
function mouseClicked() {
if (
    gameState === "start" &&
    mouseX > 150 &&
    mouseX < 255 &&
    mouseY > 200 &&
    mouseY < 235
  ) {
    gameState = "play";
  } else if (gameState === "death") {
    setup();
    gameState = "play";
  }
}

// start screen
function drawStartScreen() {
    background(135, 206, 235); // Sky blue
    fill(231, 84, 128);
    rect(150, 200, 105, 35, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Start game", 202, 218);
  }  

  // death screen
function drawDeathScreen() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over", canvasWidth / 2, canvasHeight / 2);
    textSize(18);
    text("Click to restart", canvasWidth / 2, canvasHeight / 2 + 40);
  }