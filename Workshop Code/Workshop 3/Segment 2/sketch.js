let canvasWidth, canvasHeight;
let video;
let model;

function setup() {
  canvasWidth = 400;
  canvasHeight = 400;

  noCanvas();

  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  
  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 2 };
  model = featureExtractor.classification(video, options);
}


function modelReady() {
  console.log("MobileNet loaded");
}



function draw() {}
