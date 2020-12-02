var monkey , monkeyRunning;
var banana ,bananaImage,ground,obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var bg,bgImage;
var score = 0;
var survivalTime = 0;
var gameState = "play";

function preload(){
  
  
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg");
 
}



function setup() 
{
  createCanvas(600,400);
  
  bg = createSprite(300,200);
  bg.addImage("bg",bgImage);
  bg.velocityX = -2; 
  
  monkey = createSprite(50,300);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale = 0.18;
  
  ground = createSprite(400,370,800,5);
  ground.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() 
{
  background("white");
  
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(gameState === "play")
    {
  
  if(keyDown("space") && monkey.y>=260 && gameState === "play")
    {
      monkey.velocityY = -10;
    }
      
  if(frameCount%40===0)
    {
      survivalTime = survivalTime + 1;
    }
      
  if(monkey.isTouching(FoodGroup))
    {
      FoodGroup.destroyEach();
      score = score + 1;
    }
  
  if(bg.x<=280)
    {
      bg.x = ground.width/2;
    }
  
  //monkey.debug = true;
  
  spawnBanana();
  spawnObstacles();
    }
  
  if(monkey.isTouching(obstacleGroup))
    {
      gameState = "end";
    }
  
  if(gameState === "end")
    {
      ground.velocityX = 0;
      banana.velocityX = 0;
      obstacle.velocityX = 0;
      banana.lifetime = -1;
      obstacle.lifetime = -1;
      FoodGroup.destroyEach(); 
      bg.velocityX = 0;
    }
  
  drawSprites();
  
  fill("red");
  textSize(15);
  text("Survival Time:"+survivalTime,30,50)
  fill("blue");
  text("Score:"+score,500,50);
}

function spawnBanana()
{
  if(frameCount%120 === 0)
    {
      banana = createSprite(570,random(80,120));
      banana.addImage(bananaImage);
      banana.scale = 0.08;
      banana.velocityX = -6;
      banana.lifetime = 100;
      FoodGroup.add(banana);
    }
}

function spawnObstacles()
{
  if(frameCount%300 === 0)
    {
      obstacle = createSprite(670,350);
      obstacle.addImage("blocker",obstacleImage);
      obstacle.velocityX = -6;
      obstacle.scale = 0.15;
      obstacle.lifetime = 150;
      obstacleGroup.add(obstacle);
    }
}



