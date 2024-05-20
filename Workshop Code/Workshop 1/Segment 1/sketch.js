let w;
let h;
let nn;
let res;
let res_r;
let res_g;
let res_b;

let conf;
let colorLabel = ['purple-ish', 'blue-ish', 'yellow-ish', 'orange-ish', 'green-ish', 'red-ish', 'brown-ish', 'grey-ish', 'pink-ish'];

function setup(){
    
  w = window.innerWidth/2;
  h = window.innerHeight/2;
	
  createCanvas(w,h);
  
  let nnOptions = {
    dataUrl: 'data/colorData.json',
    inputs: ['label'],
    outputs: ['r', 'g', 'b'],
    task: 'regression',
    layers: [
      {
      type: 'dense',
      units: 16,
      activation: 'relu'
      },
      {
      type: 'dense',
      units: 16,
      activation: 'sigmoid'
      },
      {
      type: 'dense',
      activation: 'sigmoid',
      }
    ],
    debug: false
  }
  
  
  nn = ml5.neuralNetwork(nnOptions, modelReady);
  
  
  dropdown = createSelect();
  dropdown.position(20, h/2);
  for (const label of colorLabel) {
    dropdown.option(label);
  }
  
}


function modelReady(){
  nn.normalizeData();
  const trainingOptions = {
    epochs: 20,
    batchSize: 32
  };
  nn.train(trainingOptions, finishedTraining);
  
}

function finishedTraining(){
  console.log('dummy');
  classify();
}


function classify(){
  const labelSelected = dropdown.value();
  
  nn.predict([labelSelected],gotResults);
}


function gotResults(error, results){
  if (error) {
    console.error(error)
  }else{
    res_r = results[0].r;
    res_g = results[1].g;
    res_b = results[2].b;
    classify();
  }
}




function draw(){
	// this function is called in a loop as long as our p5 script is running
	// for now it just gives our canvas a blue background
	
    background(res_r, res_g, res_b);
  
  
  
}