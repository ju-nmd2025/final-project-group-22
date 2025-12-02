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
  fill(0, 100, 0); // gräs
  rect(0, 450, 400, 200);

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
function updatePlatforms() {
  for (let p of platforms) {
    if (p.y > height + 50) {
        p.y = random(-100, -20);
        p.x = random(0, width - platformWidth);
    } 
    }
}


