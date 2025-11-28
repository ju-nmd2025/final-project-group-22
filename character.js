function drawCharacter(x, y) {
    fill(255, 204, 0);
    circle(x, y, 300);
    
    fill(80, 60, 40);
    circle(x-50, y-35, 50);
    
    fill(80, 60, 40);
    circle(x+50, y-35, 50);
    
    fill(80, 60, 40);
    arc(x, y+30, 170, 140, 0, PI);
}

let x = 200;
let y = 200;
console.log(drawCharacter(x, y));

