export default class Platform {
  constructor(x, y, w = 60, h = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    rect(this.x, this.y, this.w, this.h);
  }

// scrollar ner när spelar är högt upp
  scroll(speed) {
    this.y += speed;
  }
}

export function generatePlatforms(
  platforms,
  playerY,
  canvasWidth,
  canvasHeight,
 ) {
  for (let i = platforms.length - 1; i >= 0; i--) {
    platforms[i].draw();
    }

// Ta bort plattformar som förvinner nedåt
    if (platforms[i].y > canvasHeight) {
      platforms.splice(i, 1);

// Skapa ny plattform längst upp
      const newX = Math.random() * (canvasWidth - 60);
      const newY = -10;

      platforms.push(new platform(newX, newY));
    }
  }


export { generatePlatforms };

    


