export default class Platform {
  constructor(x, y, type = 'normal', w = 60, h = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.type = type; // normal, moving, breakable
    this.broken = false;
    this.steppedOn = false; // player jumping once on platform
  

  // parameter for moving platforms
    if (this.type === 'moving') {
      this.xStart = x;
      this.moveRange = 50;
      this.xSpeed = 1.5;
      this.xDirection = 1; // 1 = right, -1 = left
    }
    this.color = this.getColor();
  }

  update() {
    if (this.type === 'moving') {
      this.x += this.xSpeed * this.xDirection;

      // turning direction
      if (this.x > this.xStart + this.moveRange || this.x < this.xStart - this.moveRange) {
        this.xDirection *= -1;
      }
    }
  }

  draw() {
    if (this.broken) {
      return;
    }

    fill(this.color);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  getColor() {
    if (this.type === 'moving') return color(255, 0, 0); // red
    if (this.type === 'breakable') return color(150, 75, 0); // brown
    if (this.type === 'singleUse') return color(255, 255, 0); // yellow
    return color(100, 200, 100); // Normal: grön)
  }
}


export function assignPlatformType(platform) {
  // slump av platforms
  let r = random();

  if (r < 0.25) {
    // breakable
    return 'breakable';
  } else if (r < 0.45) {
    // moving platform
    return 'moving';
  } else if (r < 0.6) {
    // one-time used platform
    return 'singleUse';
  } else {
    // normal platform
    return 'normal';
  }
}

// generate new platforms
export function generatePlatforms(platforms, playerY, canvasWidth, canvasHeight){
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > playerY + canvasHeight || platforms[i].broken) {
      platforms.splice(i, 1);
    }
  }

  while (platforms.length < 12) {
    let type = assignPlatformType();
    let p = new Platform(random(canvasWidth - 60), playerY - random(50, 100), type);
    platforms.push(p);
  }
}