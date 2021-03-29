var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2=
  loadAnimation("images/mainPlayer3.png");
  obstacle1 = loadAnimation("opponent1.png","opponent2.png");
  obstacle2 = loadAnimation("opponent3.png");
  obstacle3 = loadAnimation("opponent4.png","opponent5.png");
  obstacle4 = loadAnimation("opponent6.png");
  obstacle5 = loadAnimation("opponent7.png","opponent8.png");
  obstacle6 = loadAnimation("opponent9.png");
  
  gameOverImage = loadImage("gameOver.png");
  cycleBell = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
 pinkGroup = new Group();
 yellowGroup = new Group();
 redGroup = new Group();

  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(keyDown("space")){
      cycleBell.play();
    }
    var rand = Math.round(random(1,3));
    if(frameCount%150===0){
      if(rand===1){
        pinkCycle();
      } else if(rand===2){
        yellowCycle();
      } else {
        redCycle();
      }
    }
    if(pinkGroup.isTouching(mainCyclist)){
      gameState = END
      player1.velocityY = 0;
      player1.addAnimation("b",obstacle2);
    }
    if(yellowGroup.isTouching(mainCyclist)){ 
      gameState = END
      player2.velocityY = 0;
      player2.addAnimation("b",obstacle4);
    }
    if(redGroup.isTouching(mainCyclist)){
      gameState = END
      player3.velocityY = 0;
      player3.addAnimation("b",obstacle6);
    }
    
 }
}
function pinkCycle(){
  player1 = createSprite(1100, Math.round(random(50,250)));
  player1.scale = 0.06;
  player1.velocityX = -(6+2*distance/150);
  player1.addAnimation("a",obstacle1);
  player1.setLifetime = 170;
  pinkGroup.add(player1)
}
function yellowCycle(){
  player2 = createSprite(1100, Math.round(random(50,250)));
  player2.scale = 0.06;
  player2.velocityX = -(6+2*distance/150);
  player2.addAnimation("a",obstacle3);
  player2.setLifetime = 170;
  yellowGroup.add(player2)
}function redCycle(){
  player3 = createSprite(1100, Math.round(random(50,250)));
  player3.scale = 0.06;
  player3.velocityX = -(6+2*distance/150);
  player3.addAnimation("a",obstacle5);
  player3.setLifetime = 170;
  redGroup.add(player3)
}