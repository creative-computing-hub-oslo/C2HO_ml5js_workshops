let w;
let h;
let nn;

let res;
let conf;

function setup() {
  w = window.innerWidth/2;
  h = window.innerHeight/2;

  createCanvas(w, h);

  // define some variables for our neural network
  let nnOptions = {
    dataUrl: "data/colorData.json",
    inputs: ["r", "g", "b"],
    outputs: ["label"],
    task: "classification",
    layers: [
      {
        type: "dense",
        units: 16,
        activation: "relu",
      },
      {
        type: "dense",
        units: 16,
        activation: "sigmoid",
      },
      {
        type: "dense",
        activation: "sigmoid",
      },
    ],
    debug: true,
  };

  nn = ml5.neuralNetwork(nnOptions, modelReady);

  // add R,G,B value sliders to our canvas in the setup function
  rSlider = createSlider(0, 255);
  gSlider = createSlider(0, 255);
  bSlider = createSlider(0, 255);
  // Place them in the top left corner of the canvas
  rSlider.position(20, 20);
  gSlider.position(20, 50);
  bSlider.position(20, 80);
  
  
  // set some variables for our text
  textSize(30);
  fill(255);
  stroke(0);
  strokeWeight(4);
  

}

function modelReady() {
  nn.normalizeData();

  const trainingOptions = {
    epochs: 20,
    batchSize: 64,
  };

  nn.train(trainingOptions);
  classify();
}


function classify() {
  let inputs = {
    r: rSlider.value(),
    g: gSlider.value(),
    b: bSlider.value()
  }
  nn.classify([inputs.r, inputs.g, inputs.b], gotResults);
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    res = results[0].label;
    conf = results[0].confidence.toFixed(2);    
	classify();
  }
}


function draw() {
  background(rSlider.value(), gSlider.value(), bSlider.value());
  
  
  text('R', rSlider.x * 2 + rSlider.width, 35);
  text('G', gSlider.x * 2 + gSlider.width, 65);
  text('B', bSlider.x * 2 + bSlider.width, 95);
  
  text(`label: ${res},\nconfidence: ${conf}`, 20, h/2);
  
}
