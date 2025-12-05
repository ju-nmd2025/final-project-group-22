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
function setup (){
    createCanvas (400, 600);

    drawEmoji (250, 250);
}

function drawEmoji (x, y){
 fill (255, 255, 90);
stroke (1);
strokeWeight (1);
ellipse (x, y, 50, 50);

fill ("white");
ellipse (x + 10, y - 5, 20, 20);

fill ("black");
ellipse (x + 12, y- 5, 5, 5);



 fill("white");
  ellipse(x - 25, y + 5 , 30, 20); 

   fill("white");
  ellipse(x- 25, y - 5, 20, 10); 

  

  fill("orange");
  ellipse(x + 20, y + 10, 20, 10);

  fill("red");
  ellipse(x + 20, y + 10, 20, 1);
  
}
