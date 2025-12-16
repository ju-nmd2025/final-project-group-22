export class Character {
  constructor(x, y, w = 50, h = 50) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.ySpeed = 0;
    this.xSpeed = 5;
  }

  draw() {
    push();
    this.drawHead();
    this.drawWings();
    this.drawEyes();
    this.drawMouth();
    pop();
  }

drawHead() {
  fill(255, 255, 90); // gul kropp
  stroke(0);
  strokeWeight(1);
  ellipse(this.x, this.y, 50, 50);
}

drawWings() {
  fill("white");
  stroke(1);
  ellipse(this.x - 25, this.y + 5, 30, 20);
  ellipse(this.x - 25, this.y -5, 20, 10);


}
drawEyes() {
  fill("white");
  stroke(0);
  ellipse(this.x + 10, this.y - 5, 20, 20);
  fill("black");
  noStroke();
  ellipse(this.x + 12, this.y - 5, 5, 5);
}

drawMouth() {
  fill("orange");
  stroke(0);
  ellipse(this.x + 20, this.y + 10, 20, 10);

  stroke("red");
  line(this.x + 10, this.y + 10, this.x + 30, this.y + 10);
 }
}
