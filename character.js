export function Character(x, y) {
    this.x = x;
    this.y = y;
}

// bird
function drawCharacter(x, y) {
  drawCharacterHead(x, y);
  drawCharacterEyes(x, y);
  drawCharacterMouth(x, y);
}

function drawCharacterHead(x, y) {
  fill(255, 255, 90);
  stroke(1);
  strokeWeight(1);
  ellipse(x, y, 50, 50);
}

function drawCharacterEyes(x, y) {
  // eyes
  fill("white");
  ellipse(x + 10, y - 5, 20, 20);
  fill("black");
  ellipse(x + 12, y - 5, 5, 5);

  //wings
  fill("white");
  ellipse(x - 25, y + 5, 30, 20);
  ellipse(x - 25, y - 5, 20, 10);
}

function drawCharacterMouth(x, y) {
  fill("orange");
  ellipse(x + 20, y + 10, 20, 10);

  fill("red");
  ellipse(x + 20, y + 10, 20, 1);
}