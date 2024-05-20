let canvasWidth, canvasHeight;
let video;
let handPose;
let predictions = [];

let hotColorFrom;
let hotColorTo;
let coldColorFrom;
let coldColorTo;

function setup() {
  canvasWidth = 640;
  canvasHeight = 480;
  createCanvas(canvasWidth, canvasHeight);

  video = createCapture(VIDEO);
  video.size(width, height);

  // Hide the video element, and just show the canvas
  video.hide();

  handPose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handPose.on("predict", (results) => {
    predictions = results;
  });
  
  const options = {numLabels: 2};
  
  featureExtractor = ml5.featureExtractor.classification(video, options);

  hotColorFrom = color(255, 0, 0);
  hotColorTo = color(255, 255, 0);

  coldColorFrom = color(0, 0, 255);
  coldColorTo = color(255, 255, 255);
}

function modelReady() {
  console.log("Handpose loaded!");
}

function imageModelReady(){
  console.log("image model loaded");
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

function draw() {
  background(45, 50);

  drawHotHands();
  //drawColdHands();
}
