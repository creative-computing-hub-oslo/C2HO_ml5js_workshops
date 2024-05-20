let canvasWidth, canvasHeight;
let video;
let model;

let classA = 0;
let classB = 0;


function setup() {
  canvasWidth = 400;
  canvasHeight = 400;

  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  
  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 2 };
  model = featureExtractor.classification(video, options);
  
  buttonSetup();
}


  
function buttonSetup(){
 // When the class A button is pressed, add the current frame
  // from the video with a label of "A" to the classifier
  buttonA = select("#buttonA");
  buttonA.mousePressed(function() {
    model.addImage("A");
    select("#amountOfClassA").html((classA += 1));
  });

  
  buttonB = select("#buttonB");
  buttonB.mousePressed(function() {
    model.addImage("B");
    select("#amountOfClassB").html((classB += 1));
  });

}

  

function modelReady() {
  console.log("MobileNet loaded");
}

  


