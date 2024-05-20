let canvasWidth, canvasHeight;
let video;
let model;

let classA = 0;
let classB = 0;

let handPose;
let predictions = [];

let hotColorFrom;
let hotColorTo;
let coldColorFrom;
let coldColorTo;

let hot = false;
let cold = false;

function setup() {
  canvasWidth = 400;
  canvasHeight = 400;

  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);

  video.hide();

  createCanvas(canvasWidth, canvasHeight);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 2 };
  model = featureExtractor.classification(video, options);

  handPose = ml5.handpose(video, HPmodelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handPose.on("predict", (results) => {
    predictions = results;
  });

  
  // Predict Button
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);


  // Load model
  loadBtn = select("#load");
  loadBtn.changed(function () {
    model.load(loadBtn.elt.files, function () {
      console.log("Custom Model Loaded!");
    });
  });
  
  
  hotColorFrom = color(255, 0, 0);
  hotColorTo = color(255, 255, 0);

  coldColorFrom = color(0, 0, 255);
  coldColorTo = color(255, 255, 255);
}


function modelReady() {
  console.log("MobileNet loaded");
}

function HPmodelReady() {
  console.log("HandPose loaded");
}

// Classify the current frame.
function classify() {
  model.classify(gotResults);
}

// Show the results
function gotResults(err, results) {
  // Display any error
  if (err) {
    console.error(err);
  }
  if (results && results[0]) {
     
    if (results[0].label == "A") {
      hot = true;
      cold = false;
      
      
    }if (results[0].label == "B") {
      hot = false;
      cold = true;
    }

    classify();
  }
}

function drawColdHands() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint1 = prediction.landmarks[j];

      c = lerpColor(coldColorFrom, coldColorTo, random(0.0, 1.0));
      fill(c);
      noStroke();
      ellipse(keypoint1[0], keypoint1[1], 5);
    }
  }
}


function drawHotHands() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    a = 0.0;
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint1 = prediction.landmarks[j];

      c = lerpColor(
        hotColorFrom,
        hotColorTo,
        a + j / prediction.landmarks.length
      );
      stroke(c);
      line(keypoint1[0], keypoint1[1], keypoint1[0], keypoint1[1] + 30);
    }
  }
}


function draw() {
  background(0,35);
  if (cold) {
    drawColdHands();
  }

  if (hot) {
    drawHotHands();
  }
}
