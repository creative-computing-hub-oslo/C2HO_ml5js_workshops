let canvasWidth, canvasHeight;
let video;
let predictions = [];

function setup() {
  canvasWidth = 640;
  canvasHeight = 480;
  createCanvas(canvasWidth, canvasHeight);
  
  video  = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  
  handPose = ml5.handpose(video, modelReady);
  video.hide();
  
  handPose.on("predict", (results) => {
    predictions = results;
  });
  
}


function modelReady(){
  console.log("Handpose loaded");
}


function drawKeypoints(){
  for (let i = 0; i < predictions.length; i += 1){
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1){
      const keypoint = prediction.landmarks[j];
      fill(0,255,0);
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}



function draw() {
  image(video, 0,0, width, height);
  drawKeypoints();
}