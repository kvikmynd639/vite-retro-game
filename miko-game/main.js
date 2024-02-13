import './style.css'
import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import {Vector2} from "./src/Vector2.js";
import {GameLoop} from "./src/GameLoop.js";
import {Input} from "./src/Input.js";
import {gridCells} from "./src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/Hero/Hero.js";
import {Camera} from "./src/Camera.js";
import {Rod} from "./src/objects/Rod/Rod.js";
import {Inventory} from "./src/objects/Inventory/Inventory.js";


// drawing canvas
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(1320, 1004)
})


mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod);

const inventory = new Inventory();



mainScene.input = new Input();


// looping
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
};


const textArray = [
  "Srečno Valentinofo",
  "Nadži si partnera",
  "Uhvatit ču te!!",
  "Ne, nečeš!"
  // Add more texts as needed
];

let currentTextIndex = 0;
let nextTextTime = 0;

const backgroundAudio = document.getElementById("backgroundAudio");

setTimeout(() => {
  backgroundAudio.play();
}, 5000);

// ...




const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //skySprite.drawImage(ctx, 0, 0)

  ctx.save();

  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();

  inventory.draw(ctx, 0, 0)


  if (Date.now() > nextTextTime) {
    currentTextIndex = (currentTextIndex + 1) % textArray.length;
    nextTextTime = Date.now() + 10000; // 10 seconds
  }

  // Add text below the image
  const text = textArray[currentTextIndex];
  const textX = canvas.width -150; // Adjust X-coordinate as needed
  const textY = canvas.height - 40; // Adjust Y-coordinate as needed
  ctx.fillStyle = 'pink';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, textX, textY);

}

//on each closing, play again
const gameLoop = new GameLoop(update, draw);
gameLoop.start();


