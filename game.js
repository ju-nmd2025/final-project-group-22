import { character } from "./character.js";
import platform from "platform";

function setup() {
    createCanvas(400, 600);
}

if(character.y + character.h < 450) {
    character.y += 10;
}
