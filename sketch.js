//Kenney.nl
//http://fontstruct.com/fontstructions/show/503556/kenney-pixel-1Creative Commons Attribution Share Alikehttp://creativecommons.org/licenses/by-sa/3.0/Five big quacking zephyrs jolt my wax bedBwkLcFxiCopyright Kenney 2011Kenney PixelRegularFontStruct Kenney PixelKenney Pixel RegularVersion 1.0Kenney-PixelFontStruct is a trademark of FSI FontShop International GmbHhttp://fontstruct.com/Kenney Kenney Pixel  was built with FontStruct


var fireBoy;
var fireJump = 0;
var waterBoy;
var waterJump = 0;

var iceGround ;
var fireGround;

var bg1;
var bg2;

var jumpPow;

var victim = true;

var pointer;

var res;

var fireRandomTickSpeed;
var iceRandomTickSpeed;

var lava;
var lavas;

var ice;
var ices;

var jumpPow;
var pows;

var score = 100;
var disScore = score - 100;

var resEase = 3;
var resEaseState = "down";

var uniVel;

const run = 0;
const reload = 1;
const menu = 2;
const down = 8;
const up = 9;
const win = 6;

var deadPlayer = "You";

var debugVar  = false;
var jumpSound;
var deathSound;
var bgSoundAmplifiedNeg24;
var gameMode = run;
var play = true;

function preload(){

    fireAnim =   loadAnimation("fireboi/FireBoi1.png","fireboi/FireBoi2.png","fireboi/FireBoi3.png","fireboi/FireBoi4.png","fireboi/FireBoi5.png","fireboi/FireBoi6.png","fireboi/FireBoi7.png","fireboi/FireBoi8.png","fireboi/FireBoi9.png","fireboi/FireBoi10.png");
    waterAnim =   loadAnimation("waterboi/WaterBoi1.png","waterboi/WaterBoi2.png","waterboi/WaterBoi3.png","waterboi/WaterBoi4.png","waterboi/WaterBoi5.png","waterboi/WaterBoi6.png","waterboi/WaterBoi7.png","waterboi/WaterBoi8.png","waterboi/WaterBoi9.png","waterboi/WaterBoi10.png");

    iceAnim = loadAnimation("ice spike/spikes1.png","ice spike/spikes2.png","ice spike/spikes3.png","ice spike/spikes4.png");
    lavaAnim = loadAnimation("lava/lava1.png","lava/lava2.png","lava/lava3.png","lava/lava4.png");

    bgImg = loadImage("bg.png");
    pointerImg = loadImage("point.png")

    resImg = loadImage("re.png");

    jumpImg = loadImage("boots.png");
    kFont = loadFont("Kenney Pixel.ttf");

    /*deathSound = loadSound("death.wav");
    jumpSound = loadSound("jump35.wav");
    spikeFormSound = loadSound("spike.wav");
    bgSynth = loadSound("synth.wav");*/




}




function setup(){

  canvas = createCanvas(displayWidth, 800);

  halfed = displayWidth/2
  scoreX = displayWidth -205
  resMesX = halfed - 240
  resTextWidth = displayWidth/10

  spawnX = displayWidth + 100

    fireBoy = createSprite(70,200, 20, 20);
    fireBoy.addAnimation("fireRun", fireAnim);
    fireBoy.scale = 0.7;
    fireBoy.depth = 3;
    fireBoy.setCollider("rectangle", -10, -35, 30, 60);

    waterBoy = createSprite(70, 650, 20, 20);
    waterBoy.addAnimation("waterRun", waterAnim);
    waterBoy.scale = 0.7;
    waterBoy.depth = 3;
    waterBoy.setCollider("rectangle", -10, 25, 30, 60);


    iceGround = createSprite(200, 94, 400, 10);
    fireGround = createSprite(200, 707, 400, 10);

    iceGround.visible = false;
    fireGround.visible = false;


    bg1 = createSprite(displayWidth/2, 400, 0, 0);
    bg2 = createSprite(displayWidth/2 + 1600, 400, 0, 0);

    bg1.addImage(bgImg)
    bg2.addImage(bgImg);



    bg1.depth = 1;
    bg2.depth = 1;

    res = createSprite(halfed, 600, 0, 0);
    res.addImage(resImg)
    res.visible = false;

    World.frameRate = 60;

    pointer = createSprite(50, 480, 20, 20);
    pointer.addImage(pointerImg);


    fireRandomTickSpeed = Math.round(random(281, 421));
    iceRandomTickSpeed = Math.round(random(183, 323));

    lavas = new Group();
    ices =  new Group();
    ress = new Group();
    pows = new Group();

    ress.add(res);
    

    textSize(54);
    textFont(kFont);


}




function draw() {

  if(gameMode === run){

    background("white");
    fireBoy.velocityY -= 0.65;
    fireBoy.collide(iceGround);
    waterBoy.velocityY += 0.65;
    waterBoy.collide(fireGround);
    
    if (World.frameCount % 8 === 0){
      score++;
    }



    disScore = score - 100
    /*if(World.frameCount % 180*8 === 0){
      bgSynth.play();
      
    }*/
    
    uniVel = -(6 + 3*score/100)/4;
    
    bg1.velocityX = uniVel;
    bg2.velocityX = uniVel;
    
  if (bg1.x + bg1.width < 800){
    bg1.x = bg2.x + bg1.width;
    }
    if (bg2.x + bg1.width < 800){
      bg2.x = bg1.x + bg2.width;
  }
    
    if(keyWentDown("t")){
      
      victim = !victim;
      
      if(victim === true){
        pointer.y = 480;
        pointer.rotation = 0;
      }
      else if(victim === false){
        pointer.y = 370;
        pointer.rotation = 180;
      }
      
    }
  
    if(keyWentDown("up") || keyWentDown("space")){
      if(victim === true && waterBoy.y > 658)
      {
        waterBoy.velocityY = -12;
        waterJump++;
        //jumpSound.play();
        
      }
      else if(victim === false && fireBoy.y < 153){
        fireBoy.velocityY = 12;
        fireJump++;
        //jumpSound.play();
      }
    }
    if(ices.isTouching(fireBoy) ){
      hide_all();
      gameMode = reload;
      //deathSound.play();
      deadPlayer = "Fire Boy"
    }
    if(lavas.isTouching(waterBoy)){
      hide_all();
      gameMode = reload;
      //deathSound.play();
      deadPlayer = "Water Boy"
    }

    
    if(keyWentDown("q")){
      hide_all();
      gameMode = reload;
      deadPlayer = "You"
    }

  
    if(keyDown("p") && keyDown("5") && keyDown("e")){
      score ++;
    }
    if(keyDown("m")){
      score = 9745;
    }

    if(score === 9750){
      hide_all();
      gameMode = win;
    }
    
    lavaSpawner();
    iceSpawner();
    //powSpawner();
    drawSprites();
   
    if(victim === true){
      fill(rgb(220, 255, 255));
      text("Score: "+ disScore, scoreX, 525);
    }
    else if(victim === false){
      fill(rgb(223, 113, 38));
      text("Score: "+ disScore, scoreX, 360);
    }
/*    if(keyWentDown("d")){
      debug();
    }
    
*/


  }
  else if(gameMode === reload){
    background(222, 23, 56);
    textSize(resTextWidth);
    fill("Yellow")
    text(deadPlayer+" Died", resMesX, 200)
    textSize(resTextWidth /1.5);
    text("Press the button below to restart", resMesX - 240, 400);

/*    if(resEaseState = up){
      resEase += 1
      if(resEase = 10){
        resEaseState = down;
      }
    }

    else if(resEaseState = down){
      resEase -= 1
      if(resEase = 3){
        resEaseState = up;
      }
    }




    console.log(resEaseState, resEase)
    res.scale = resEase;

*/

    drawSprites(ress);
    if(keyWentDown("r") || mousePressedOver(res)){
      show_all();
      gameMode = run;
    }

  }
  else if(gameMode === win){
    background(222, 23, 56);
    textSize(resTextWidth);
    fill("Yellow")
    if (fireJump>waterJump){
      text("Fireboy Won", resMesX, 100)
      textSize(resTextWidth /1.5);
      text("FireBoy: "+fireJump, resMesX, 200);
      text("WaterBoy: "+waterJump, resMesX, 300);
    }
    else if (waterJump>fireJump){
      text("Waterboy Won", resMesX, 100)
      textSize(resTextWidth /1.5);
      text("FireBoy: "+fireJump, resMesX, 300);
      text("WaterBoy: "+waterJump, resMesX, 200);
    }
    else if (fireJump===waterJump){
      text("Nice your not partial", resMesX - 200, 100);
      textSize(resTextWidth /1.5);
      text("FireBoy: "+fireJump, resMesX, 300);
      text("WaterBoy: "+waterJump, resMesX, 200);
    }
    else{
      console.log("ERROR")
    }

    textSize(resTextWidth /1.5);
    text("Press the button below to restart", resMesX - 240, 450);

/*    if(resEaseState = up){
      resEase += 1
      if(resEase = 10){
        resEaseState = down;
      }
    }

    else if(resEaseState = down){
      resEase -= 1
      if(resEase = 3){
        resEaseState = up;
      }
    }




    console.log(resEaseState, resEase)
    res.scale = resEase;

*/

    drawSprites(ress);
    if(keyWentDown("r") || mousePressedOver(res)){
      show_all();
      gameMode = run;
    }

  }

}

function lavaSpawner(){
  if(World.frameCount % fireRandomTickSpeed === 0){
    lava = createSprite(spawnX, 700, 10, 10);
    lava.depth = 2;
    lava.velocityX = uniVel;
    //spikeFormSound.play();
    lava.lifetime = 1440;
    lava.setCollider("circle", 0, 17, 20);
    lava.addAnimation("molten", lavaAnim);
    lavas.add(lava);
  }
}

function iceSpawner(){
  if(World.frameCount % iceRandomTickSpeed === 0){
    ice = createSprite(spawnX, 124, 10, 10);
    ice.depth = 2;
    ice.velocityX = uniVel;
    //spikeFormSound.play();
    ice.lifetime = 1440;
    ice.setCollider("rectangle", -5, -20, 30, 20);
    ice.addAnimation("spiky", iceAnim);
    ices.add(ice);
  }
}

function powSpawner(){
  num = Math.round(random(0, 100));
  if(num > 95){
    num = 0
    jumpPow = createSprite(900, 124, 10, 10);
    jumpPow.scale = 0.7;
    jumpPow.depth = 2;
    jumpPow.velocityX = uniVel;
    jumpPow.lifetime = 1440;
    //jumpPow.setCollider("rectangle", -5, -20, 30, 20);
    jumpPow.addImage(jumpImg);
    pows.add(jumpPow);
  }
}

function show_all(){

  fireRandomTickSpeed = Math.round(random(281, 421));
  iceRandomTickSpeed = Math.round(random(183, 323));

  
  fireBoy.y = 200;
  fireBoy.visible = true;

  waterBoy.y = 650;
  waterBoy.visible = true;

  score = 100;
  fireJump = 0;
  waterJump = 0;

  bg1.visible = true;
  bg2.visible = true;
  pointer.visible = true;
  res.visible = false;
}

function hide_all(){
  fireBoy.visible = false;
  waterBoy.visible = false;
  bg1.visible = false;
  bg2.visible = false;
  pointer.visible = false;
  res.visible = true;
  ices.destroyEach();
  lavas.destroyEach();
  
}

function debug(){
  debugVar =!debugVar;

    fireBoy.debug = debug;
    waterBoy.debug = debug;
    for(var i = 0; i < ices.length; i++){
      ices[i].debug = true;
    }
    for(var i = 0; i < lavas.length; i++){
      lavas[i].debug = true;
    }

}
