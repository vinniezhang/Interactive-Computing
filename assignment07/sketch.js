var capture;
var mol;
var points = 0;
var bark;
var uhoh;
var squirrel;
var squirArray = [];

// color to track
var r = 0;
var g = 0;
var b = 0;

var threshold = 20;

// artwork
var mole, dog, squirrel;

// dog location
var dogX = 0;
var dogY = 0;


function preload(){
    dog = loadImage('images/dog.png');
    mole = loadImage('images/mole.png');
    uhoh = loadSound('audio/squirrel.wav');
    bark = loadSound('audio/bark.wav');
    squirrel = loadImage('images/squirrel.png');
}

function setup(){

    createCanvas(640, 480);

     // start up our web cam
    capture = createCapture({
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480,
        maxWidth: 640,
        maxHeight: 480
      }
    }
  });
  
  capture.hide();

  mol = new Mole();

  for (let i = 0; i < 5; i++){
      squir = new Squirrel();
      squirArray.push(squir);

  }

}

function draw(){

    // expose the pixels in the incoming video stream
    capture.loadPixels();

    // if we have some pixels to work with them we should proceed
    if (capture.pixels.length > 0) {

        // set up variables to test for the best pixel
        var bestLocations = [];

        for (var i = 0; i < capture.pixels.length; i += 4) {

            // determine how close of a match this color is to our desired color
            var match = dist(r, g, b, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
            
            if (match < threshold) {
                bestLocations.push(i);
            }
        }

        // draw video
        imageMode(CORNER);
        image(capture, 0, 0);

        // do we have a best match?  it's possible that no pixels met our threshold
        if (bestLocations.length > 0) {

            // average up all of our locations
            var xSum = 0;
            var ySum = 0;

            for (var i = 0; i < bestLocations.length; i++) {
                xSum += (bestLocations[i] / 4) % 640; // adjust for center positioning??
                ySum += (bestLocations[i] / 4) / 640; // adjust for center positioning??
                
                // fill(0,255,0)
                // ellipse((bestLocations[i]/4)%640, (bestLocations[i]/4)/640, 3, 3 )
                
            }

            // average our sums to get our 'centroid' point
            dogX = xSum / bestLocations.length;
            dogY = ySum / bestLocations.length;

        }
    }

        imageMode(CENTER);
        image(dog, dogX, dogY, 120, 100);

        mol.draw();
        mol.move();

        for (let i = 0; i < squirArray.length; i++){
            squirArray[i].draw();
            squirArray[i].move();
        }
        

}

function mousePressed() {

    // memorize the color the user is clicking on
    var loc = int((int(mouseX)  + int(mouseY)  * capture.width) * 4);
    r = capture.pixels[loc];
    g = capture.pixels[loc + 1];
    b = capture.pixels[loc + 2];
    console.log(r,g,b)
    console.log("***",mouseX, mouseY)
}

class Mole {

    constructor(){
        this.xPos = random(260, 360),
        this.yPos = random(220, 320), 
        this.noiseOffset = random(1000) // perlin noise
    }

    draw(){
        
        imageMode(CENTER);
        image(mole, this.xPos, this.yPos, 100, 85);

        fill(122, 222, 170, 180);
        noStroke();
        rectMode(CENTER);
        rect(80, 35, 130, 50);

        fill(255);
        textSize(16);
        text("POINTS: " + points, 40, 40);

        fill(122, 222, 170, 180);
        noStroke();
        rectMode(CENTER);
        rect(515, 424, 200, 60);

        fill(255);
        textSize(12);
        text("CATCH THE MOLE! ", 460, 415);
        text("AVOID THE SQUIRRELS! ", 445, 440);
    }

    move(){

        // constrain within borders
        this.xPos = constrain(this.xPos, 0, 640);
        this.yPos = constrain(this.yPos, 0, 480);

        // if touching side borders, reverse direction
        if (this.xPos <= 0 || this.xPos >= 620) {
            this.xPos *= -1;
        }

        // if touching bottom / top borders, reverse direction
        if (this.yPos <= 0 || this.yPos >= 440) {
            this.yPos *= -1;
        }

        // add 1 point if touching, also make mole pop up in different location
        if (dist(this.xPos, this.yPos, dogX, dogY) < 40) {
            points += 1;
            bark.play();
            this.xPos = random(30, 590);
            this.yPos = random(50, 400);
            image(mole, this.xPos, this.yPos, 100, 85);
        }

    }

}

class Squirrel{

    constructor(){
        this.xPos = random(30, 600),
        this.yPos = random(30, 400), 
        this.xnoiseOffset = random(1000), // perlin noise
        this.ynoiseOffset = random(1000), // perlin noise
        this.xReverse = 1,
        this.yReverse = 1,
        this.squirrelHit = false,
        this.squirrelFrame = 0;
    }

    draw(){
        
        imageMode(CENTER);
        image(squirrel, this.xPos, this.yPos, 80, 65);

    }

    move(){

        // constrain within borders
        this.xPos = constrain(this.xPos, 0, 640);
        this.yPos = constrain(this.yPos, 0, 480);

        // if touching side borders
        if (this.xPos <= 0 || this.xPos >= 640) {
            this.xReverse *= -1;
        }

        // if touching bottom / top borders
        if (this.yPos <= 0 || this.yPos >= 480) {
            this.yReverse *= -1;
        }

        // if touching dog, lose 1 point, can't lose another point until all frames pass
        if (dist(this.xPos, this.yPos, dogX, dogY) < 25 && this.squirrelHit === false) {
            points -= 1;
            uhoh.play();
            this.squirrelHit = true;
        } else {

            // move squirrels using perlin noise --> will reverse direction if touching borders
            this.xPos += this.xReverse * map(noise(this.xnoiseOffset), 0, 1, -4, 4);
            this.yPos += this.yReverse * map(noise(this.ynoiseOffset), 0, 1, -4, 4);

            this.xnoiseOffset += 0.01;
            this.ynoiseOffset += 0.01;
        }

        // preventing squirrel touch from making user lose many points
        if (this.squirrelHit === true){
            this.squirrelFrame += 1;
        }

        // once the frame count reaches 80, user can lose points again
        if (this.squirrelFrame >= 80) {
            this.squirrelHit = false;
            this.squirrelFrame = 0;
        }


    }
    
}
