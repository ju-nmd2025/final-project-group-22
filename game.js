import { character } from "./character.js";
import platform from "platform";

function setup() {
    createCanvas(400, 600);
}

if(character.y + character.h < 450) {
    character.y += 10;
}


function showGameOver () {
fill(0, 0, 0, 180);
rect(0, 0, 400, 600);
fill(255);
textSize(35);
textAlign (CENTER);
text("GAME OVER", 200, 260);

textSize(15);
text("Tryck på R för att spela igen!", 200, 320);

}


function restartGame() {
    isGameOver = false;
    createPlatforms();
}
