let w;
let h;
let nn;


let res_r;
let res_g;
let res_b;

let colorLabels = ['purple-ish','green-ish','blue-ish','red-ish','yellow-ish','pink-ish','orange-ish','brown-ish','grey-ish',];


function setup() {
  w = window.innerWidth/2;
  h = window.innerHeight/2;

  createCanvas(w, h);

  // define some variables for our neural network
  let nnOptions = {
    dataUrl: "data/colorData.json",
    inputs:  ["label"],
    outputs: ["r", "g", "b"],
    task: "regression",
    layers: [
      {
        type: "dense",
        units: 16,
        activation: "sigmoid",
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
    debug: false,
  };

  nn = ml5.neuralNetwork(nnOptions, modelReady);

  
  
  dropdown = createSelect();
  dropdown.position(20,h/2);
  dropdown.size(200,60);
  for (const label of colorLabels) {
    dropdown.option(label);
  }

}

function modelReady() {
  nn.normalizeData();

  const trainingOptions = {
    epochs: 20,
    batchSize: 34,
  };

  nn.train(trainingOptions);
  predict();
}


function predict() {
  // Create dropdown with all possible labels
  const labelSelected = dropdown.value();
  console.log(`label chosen :`, labelSelected);
  nn.predict([labelSelected], gotResults);
  
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    res_r = results[0].r;
    res_g = results[1].g;
    res_b = results[2].b;
    predict();
  }
}


function draw() {
  background(res_r,res_g, res_b);
  
}
