import Platform, { generatePlatforms } from "./platform.js";

let platforms = [];
let player;

function setup() {
    createCanvas(400, 600);


// Create platforms
for (let i = 0; i < 6; i++) {
    platforms.push(
        new Platform(
          Math.random() * (width - 60),
          height - i * 100
        )
      );
}

// Create player
player = {
    x: width / 2,
    y: height - 100,
    w: 30,
    h: 30,
    vy: 0
  };
}

function draw() {
    background(100);

    // --- Gravitation ---
  player.vy += 0.6;
  player.y += player.vy;

  // --- Rita spelare ---
  rect(player.x, player.y, player.w, player.h);

  // --- Plattformar ---
  generatePlatforms(platforms, player.y, width, height);

  // --- Kollision med plattformar ---
  for (let p of platforms) {
    if (
      player.vy > 0 &&
      player.x + player.w > p.x &&
      player.x < p.x + p.w &&
      player.y + player.h > p.y &&
      player.y + player.h < p.y + p.h
    ) {
      player.vy = -12; // Hopp
    }
  }

  // --- Om spelaren faller ner ---
  if (player.y > height) {
    player.y = height - 100;
    player.vy = 0;
  }

  // --- Sidrörelse ---
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
}
