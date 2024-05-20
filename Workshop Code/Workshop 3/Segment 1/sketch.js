let canvasWidth, canvasHeight;
let model;
let classA = 0;
let classB = 0;
let happy, sad = false;
let img_happy;
let img_sad;
let img_neutral;

//function preload() {
 // img_happy = loadImage('happy.jpg');
  //img_sad = loadImage('sad.jpg');
  //img_neutral = loadImage('neutral.jpg');
//}


function setup() {
  canvasWidth = 400; 
  canvasHeight = 400;
  createCanvas(canvasWidth, canvasHeight);
  
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  
  const options = {numLabels: 2}
  model = featureExtractor.classification(video, options);
  buttonSetup();
}



function buttonSetup(){
  
  buttonA = select("#buttonA");
  buttonA.mousePressed(function() {
    model.addImage("A");
    select("#amountOfClassA").html((classA += 1));
  })
  
  buttonB = select("#buttonB");
  buttonB.mousePressed(function() {
    model.addImage("B");
    select("#amountOfClassB").html((classB += 1));
  })
  
  
  train = select("#train");
  train.mousePressed(function(){
    model.train(function(lossValue) {
    if(lossValue){
      loss = lossValue;
      select("#loss").html(`Loss ${loss}`);
    }else{
      select("#loss").html(`Done training! Final loss is ${loss}`);
    }
  });
});
  
  
  
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);
  
  
  saveButton = select("#save");
  saveButton.mousePressed(function() {
    model.save();
  });
  
  loadButton = select("#load");
  loadButton.changed(function() {
    model.load(loadButton.elt.files, function() {
      select("#modelStatus").html("Custom model loaded!")
    });
    
  });
  
}

function classify(){
  model.classify(gotResults);
}


function gotResults(err, results){
  if (err){
    console.error(err);
  }
  if(results && results[0]){
    
    select("#result").html(results[0].label);
    select("#confidence").html(`${results[0].confidence.toFixed(2) * 100} %`);
    if(results[0].label == "A"){
      happy = true;
      sad = false;
    }
    if (results[0].label == "B"){
      happy = false;
      sad = true;
    }
    
    classify();
    //console.log(results)
    
  }
  
}



function modelReady() {
  console.log("MobileNet ready!!!");
}


function draw() {
  //background(img_neutral);
  
  //if (happy) {
  //  image(img_happy, 0,0,canvasWidth, canvasHeight);
  //}
  
  //if (sad) {
  //  image(img_sad, 0,0,canvasWidth, canvasHeight);
    
  //}
  
}