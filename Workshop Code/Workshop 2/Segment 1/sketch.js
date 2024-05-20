let seedStrokes = [];
let canvasWidth, canvasHeight;
let model;
let x;
let y;
let strokePath = null;
let previous_pen = "down";
let r, g, b, w;
let listOfModels = ['alarm_clock',
  'ambulance',
  'angel',
  'ant',
  'antyoga',
  'backpack',
  'barn',
  'basket',
  'bear',
  'bee',
  'beeflower',
  'bicycle',
  'bird',
  'book',
  'brain',
  'bridge',
  'bulldozer',
  'bus',
  'butterfly',
  'cactus',
  'calendar',
  'castle',
  'cat',
  'catbus',
  'catpig',
  'chair',
  'couch',
  'crab',
  'crabchair',
  'crabrabbitfacepig',
  'cruise_ship',
  'diving_board',
  'dog',
  'dogbunny',
  'dolphin',
  'duck',
  'elephant',
  'elephantpig',
  'eye',
  'face',
  'fan',
  'fire_hydrant',
  'firetruck',
  'flamingo',
  'flower',
  'floweryoga',
  'frog',
  'frogsofa',
  'garden',
  'hand',
  'hedgeberry',
  'hedgehog',
  'helicopter',
  'kangaroo',
  'key',
  'lantern',
  'lighthouse',
  'lion',
  'lionsheep',
  'lobster',
  'map',
  'mermaid',
  'monapassport',
  'monkey',
  'mosquito',
  'octopus',
  'owl',
  'paintbrush',
  'palm_tree',
  'parrot',
  'passport',
  'peas',
  'penguin',
  'pig',
  'pigsheep',
  'pineapple',
  'pool',
  'postcard',
  'power_outlet',
  'rabbit',
  'rabbitturtle',
  'radio',
  'radioface',
  'rain',
  'rhinoceros',
  'rifle',
  'roller_coaster',
  'sandwich',
  'scorpion',
  'sea_turtle',
  'sheep',
  'skull',
  'snail',
  'snowflake',
  'speedboat',
  'spider',
  'squirrel',
  'steak',
  'stove',
  'strawberry',
  'swan',
  'swing_set',
  'the_mona_lisa',
  'tiger',
  'toothbrush',
  'toothpaste',
  'tractor',
  'trombone',
  'truck',
  'whale',
  'windmill',
  'yoga',
  'yogabicycle',
  'everything'];

function setup() {
  canvasHeight = 800;
  canvasWidth = 800;
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(244);
  canvas.hide();

  model = ml5.sketchRNN("face", modelReady);

  let button = createButton("clear");
  button.position(20, 120);
  button.mousePressed(clearDrawing);
}


function clearDrawing(){
  
  background(244);
  x = canvasWidth/2;
  y = canvasHeight/2;
  
  r = random(0, 10);
  g = random(0, 255);
  b = random(0, 255);

  w = random(5, 20);

  
  seedStrokes = [];
  model.reset();
}


function startSketchRNN(){
  
  console.log("START")
  x = mouseX;
  y = mouseY;
  
  model.generate(seedStrokes, gotStroke);
}




function gotStroke(err, s) {
  if (err) {
    console.error(err);
  } else {
    //console.log(s);
    strokePath = s;
  }
}

function modelReady() {
  select("#status").html("Model loaded!");
  canvas.show();
  canvas.mouseReleased(startSketchRNN);
}

function old_draw() {
  if (strokePath) {
    if (previous_pen == "down") {
      stroke(r, g, b);
      strokeWeight(w);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;

    if (strokePath.pen != "end") {
      model.generate(gotStroke);
    } else {
      model.reset();
      strokePath = null;
    }
  }
}


function draw(){
  if(mouseIsPressed) {
    stroke(0);
    strokeWeight(4);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    let userStroke = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: "down",
    };
    
    seedStrokes.push(userStroke);
  }
  
  old_draw();
  
}
