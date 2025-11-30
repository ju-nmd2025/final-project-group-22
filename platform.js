let platforms = [];

let platformCount = 8;
let platformWidth = 70;
let platformHeight = 15;
let minGap = 60;
let maxGap = 110;

function setup() {
  createCanvas(400, 600);
  createPlatforms();
}

function draw() {
  background(135, 206, 235); // himmel

  updatePlatforms(2); 
  drawPlatforms();
}

// Skapar stegar med bra slump-avstånd
function createPlatforms() {
  let y = height;

  for (let i = 0; i < platformCount; i++) {
    let gap = random(minGap, maxGap);
    y -= gap;

    let x = random(0, width - platformWidth);

    platforms.push({
      x: x,
      y: y,
      w: platformWidth,
      h: platformHeight
    });
  }
}

// Ritar stegar
function drawPlatforms() {
  fill(139, 69, 19); // brun färg
  noStroke();

  for (let p of platforms) {
    rect(p.x, p.y, p.w, p.h);
  }
}

// Oändlig scroll – återanvänd stegar
function updatePlatforms(speed) {
  for (let p of platforms) {
    p.y += speed;

    if (p.y > height) {
      p.y = -platformHeight;
      p.x = random(0, width - platformWidth);
    }
  }
}
