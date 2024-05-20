let canvasWidth, canvasHeight;
let video;
let handPose;
let predictions = [];

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
    //print(predictions);
  });
}

function modelReady() {
  console.log("Model loaded!");
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function draw() {
  image(video, 0, 0, width, height);
  
  drawKeypoints();
}
