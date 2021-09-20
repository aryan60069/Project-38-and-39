//declare variables
var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var cycles, racer1, racer2;
var cycleRacer1Fall, cycleRacer1Moving, cycleRacer2Moving, cycleRacer2Fall;
var road, ground;

function preload(){
//load your images here
cycleRacer1Moving = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
cycleRacer1Fall = loadAnimation("images/mainPlayer3.png");

cycleRacer2Moving = loadAnimation("images/opponent1.png", "images/opponent2.png");
cycleRacer2Fall = loadAnimation("images/opponent3.png");

road = loadImage("images/Road.png");
ground = loadImage("images/formBackground.jpg")
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-140);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(ground);

  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }

  
  if(gameState === 2){
    game.end();
  }
}
