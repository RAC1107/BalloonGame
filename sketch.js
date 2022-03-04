var globo, fotoGlobo, sky;
var database;
var height;
var canvasSize;

function preload(){
  sky = loadImage("Images/sky.jpeg");
  fotoGlobo = loadImage("Images/balloon.png");
}


function setup(){

  database = firebase.database();

  createCanvas(windowWidth, windowHeight);

  globo = createSprite(windowWidth/8 , windowHeight*2/3 , windowWidth/15 , windowHeight/8);
  globo.addImage("fotoGlobo", fotoGlobo);

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);

  canvasSize = (windowWidth + windowHeight)/2
}

function draw() {
  background(sky);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
  }

  drawSprites();

  fill(0);
  stroke("white");
  textSize((windowWidth+windowHeight)/100);
  text("**Utiliza las teclas de flecha para mover el globo aerostático",windowWidth/10, windowHeight/10);
  globo.scale = (windowWidth+windowHeight)/2500;
  background.scale = (windowWidth+windowHeight)/2;

  if(canvasSize !== ((windowWidth+windowHeight)/2)){
    canvasSize = (windowWidth+windowHeight)/2
    refresh();
    console.log("go");
  }


}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  globo.x = height.x;
  globo.y = height.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
