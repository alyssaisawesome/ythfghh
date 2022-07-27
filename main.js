var img = "";
var model_status = "";
var objects = [];
var ring="";

function preload() {
  ring=loadSound('ring.mp3');
}

function setup() {
  img = createCapture(VIDEO);
  img.size(380,380);
  img.hide();
  canvas = createCanvas(1000, 600);
  canvas.center();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById('status').innerHTML = "status: Detecting baby";
}

function modelLoaded() {
  console.log('model loaded');
  model_status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(img, 0, 0, 1000, 600);
  if (model_status != "") {
    objectDetector.detect(img, gotResult);
    for (i = 0; i < objects.length; i++) {

      if (objects[i].label == 'person'){
        document.getElementById('status').innerHTML = "Status: Detected baby";
        ring.stop();
      }
      
      else {
        document.getElementById('status').innerHTML = "Status: Baby not found";
        ring.play();
      }

      console.log('hi' + i);
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
      noFill();
      stroke('red');
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}