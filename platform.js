export default class Platform {
  constructor(x, y, w = 60, h = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.broken = false;
    this.singleUse = false;
    this.breakable = false; //if the platform should break
    this.steppedOn = false; // player jumping once on platform
  }
    
  draw() {
    fill(this.broken ? 150 : 100, 200, 100);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}

export function assignPlatformType(platform) {
  // slump av platformar
  let r = random();
  if (r < 0.2) platform.singleUse = true;
  else if (r < 0.4) platform.breakable = true;
}

// generera nya plattformar
export function generatePlatforms(platforms, playerY, canvasWidth, canvasHeight){
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > playerY + canvasHeight) {
      platforms.splice(i, 1);
    }
  }

  while (platforms.length < 12) {
    let p = new Platform(random(canvasWidth - 60), playerY - random(50, 100));
    assignPlatformType(p);
    platforms.push(p);
  }
}