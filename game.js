import Platform, { generatePlatforms } from "./platform.js";

let gameState = "start";
let platforms = [];
let player;

function setup() {
    createCanvas(400, 600);
    textSize(18);
    textStyle(BOLD);

    // create platforms
    for (let i = 0; i < 12; i++) {
      platforms.push(new Platform(Math.random() * (width - 60), height - i * 40)
      );
    }

  // create player
     player = {
      x: width / 2,
      y: height - 100,
      w: 30,
      h: 30,
      vy: 0
     };
  }

  function draw() {
    if (gameState === "start") {
      drawStartScreen();
    } else if (gameState === "play") {
      drawGame();
    }
  }

  function drawStartScreen() {
    background(135, 206, 235); // Sky blue

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

function drawGame() {
  background(135, 206, 235); // Sky blue

  player.vy += 0.6;
  player.y += player.vy;

  let scrollSpeed = 0;
  if (player.y < height / 2 && player.vy < 0) {
    scrollSpeed = 4;
  }

  for (let p of platforms) {
    p.y += scrollSpeed;
  }

  rect(player.x, player.y, player.w, player.h);

  generatePlatforms(platforms, player.y, width, height);

  for (let p of platforms) {
    if (
      player.vy > 0 &&
      player.x + player.w > p.x &&
      player.x < p.x + p.w &&
      player.y + player.h > p.y &&
      player.y + player.h < p.y + p.h
    ) {
      player.vy = -12;
    }
  }

  if (player.y > height) {
    player.y = height - 100;
    player.vy = 0;
  }

  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
}

function mouseClicked() {
  if (
    gameState === "start" &&
    mouseX > 150 &&
    mouseX < 235 &&
    mouseY > 200 &&
    mouseY < 235
  ) {
    console.log("Button clicked!");
    gameState = "play";
    cursor(ARROW);
  }


  function showGameOver () {
   fill(0, 0, 0, 180);
   rect(0, 0, 400, 600);
   fill(255);
   textSize(35);
   textAlign (CENTER);
   text("GAME OVER", 200, 260);

   textSize(15);
   text("Tryck på R för att spela igen!", 200, 320);
  }


  function restartGame() {
    isGameOver = false;
    createPlatforms();
  }
}
