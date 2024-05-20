let w;
let h;
let nn;

function setup(){
    
  w = window.innerWidth/2;
  h = window.innerHeight/2;
	
  createCanvas(w,h);
  
  // define some variables for our neural network
  let nnOptions = {
    dataUrl: 'data/colorData.json',
    inputs: ['r', 'g', 'b'],
    outputs: ['label'],
    task: 'classification',
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
		      activation: 'sigmoid'
		    }
		  ],
    debug: true
  };
  
  nn = ml5.neuralNetwork(nnOptions, modelReady);
}




function modelReady() {
  
  nn.normalizeData();
  
  const trainingOptions = {
    epochs: 20,
    batchSize: 64
  }
  
  nn.train(trainingOptions);
}



function draw(){
	// this function is called in a loop as long as our p5 script is running
	// for now it just gives our canvas a blue background
	
    background(0,0,255);
}