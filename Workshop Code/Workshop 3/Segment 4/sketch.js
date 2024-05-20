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

  
  // Train Button
  train = select("#train");
  train.mousePressed(function() {
    model.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select("#loss").html(`Loss: ${loss}`);
      } else {
        select("#loss").html(`Done Training! Final Loss: ${loss}`);
      }
    });
  });

  // Predict Button
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);

}

  

function modelReady() {
  console.log("MobileNet loaded");
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
    select("#result").html(results[0].label);
    select("#confidence").html(`${results[0].confidence.toFixed(2) * 100  }%`);
    classify();
  }
}

