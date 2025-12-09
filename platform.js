export default class Platform {
  constructor(x, y, w = 60, h = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = 0 // Horizontal velocity
  }
  
  update() {
    //Platforms moving horizontally
    if (this.vx !== 0) {
      this.x += this.vx;
      // Bounce off walls
      if (this.x < 0 || this.x + this.w > width) {
        this.vx *= -1;
      }
    }
  }

  draw() {
    fill(139, 69, 19); // Brown color
    rect(this.x, this.y, this.w, this.h);
  }
}

export function generatePlatforms(platforms, playerY, canvasWidth, canvasHeight){
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > canvasHeight) {
      platforms.splice(i, 1);
    }
  }

// Skapa ny plattform längst upp
    if (platforms.length === 0 || platforms[0].y > 60) {

      let num = Math.random();
      let newX = Math.random() * (canvasWidth - 60);
      let newY = -20;

      if (num >= 0.3) {
        platforms.unshift(new Platform(newX, newY));
      } else {
        let newPlatform = new Platform(newX, newY);
        newPlatform.vx = 2;
        platforms.unshift(newPlatform);
      }
    }
  }
