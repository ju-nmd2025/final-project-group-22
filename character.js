export class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    push();
    this.drawHead();
    this.drawEyes();
    this.drawMouth();
    pop();
  }

drawHead() {
  fill(255, 255, 90);
  stroke(0);
  strokeWeight(1);
  ellipse(this.x, this.y, 50, 50);
}

drawEyes() {
  // eyes
  fill("white");
  ellipse(this.x + 10, this.y - 5, 20, 20);
  fill("black");
  ellipse(this.x + 12, this.y - 5, 5, 5);

  //wings
  fill("white");
  ellipse(this.x - 25, this.y + 5, 30, 20);
  ellipse(this.x - 25, this.y - 5, 20, 10);
}

drawMouth() {
  push();
  fill("orange");
  ellipse(this.x + 20, this.y + 10, 20, 10);

  fill("red");
  ellipse(this.x + 20, this.y + 10, 20, 1);
  pop();
 }
}
