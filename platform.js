export default class Platform {
  constructor(x, y, w = 60, h = 10, isMoving = false, isDisappearing = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.isMoving = isMoving;
    this.isDisappearing = isDisappearing;

    this.xSpeed = 2;
    this.direction = 1; // 1: höger, -1: vänster
  }

  update() {
    if (this.isMoving) {
      this.x += this.xSpeed * this.direction;

      if (this.x + this.w > 400 || this.x < 0) {
        this.direction *= -1;
      }
    }
  }

  draw() {
    push();
    if (this.isMoving) {
      fill(200, 50, 100); // pink
    } else if (this.isDisappearing) {
      fill(255); // white
    } else {
    fill(150, 75, 0); // brown - normal platforms
    }
    noStroke();
    rect(this.x, this.y, this.w, this.h, 5);
    pop();
  }
}

// generate new platforms
export function generatePlatforms(platforms, playerY, canvasWidth, canvasHeight) {
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > canvasHeight) {
      platforms.splice(i, 1);
    }
  }

  while (platforms.length < 12) {
    let highestY = canvasHeight;
    for (let p of platforms) {
      if (p.y < highestY) highestY = p.y;
    }
  
    let r = Math.random();
    let moving = r < 0.1;
    let disappearing = r > 0.1 && r < 0.2;

    let newPlatform = new Platform(
      Math.random() * (canvasWidth - 60),
      highestY - (Math.random() * 40 + 60),
      60,
      10,
      moving,
      disappearing
    );
    platforms.push(newPlatform);
  }
}
