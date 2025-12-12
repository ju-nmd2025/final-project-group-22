export default class Platform {
  constructor(x, y, w = 60, h = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = 0; // Horizontal velocity

    this.breakable = false; //if the platform should break
    this.broken = false;    // becomes true after player jumps on it.
    this.steppedOn = false; // player jumping once on platform
  }
  
  
  update() {
    // if broken, fall down and ignore movement logic
    if (this.broken) {
      this.y += 6; // the falling speed
      return;
    }

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
    if (this.broken) return; // makes no broken platform drawn

    if (this.breakable) {
      fill(231, 84, 128); // pink - breakable platform
    } else {
      fill (139, 69, 19); // normal brown platform
    }
  
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
