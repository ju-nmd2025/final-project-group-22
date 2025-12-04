function drawCharacter(x, y) {
    fill(255, 204, 0);
    circle(x, y, 90);
    
    fill(80, 60, 40);
    circle(x-20, y-5, 25);
    
    fill(80, 60, 40);
    circle(x+20, y-5, 25); 
    
    fill(80, 60, 40);
    arc(x, y+20, 50, 30, 0, PI);
}

let x = 200;
let y = 200;
console.log(drawCharacter(x, y));



