
var paddleXPos, paddleYPos, left, right, top;
var ballXPos, ballYPos, ballXSpeed, ballYSpeed;
var objectImage, objectXPos, objectYPos, spaceBG;
var magicSound, metallicSound, blasterSound;
var points = 0;
var misses = 0;

function preload(){
    objectImage = loadImage('./images/star2.png');
    spaceBG = loadImage("./images/space_bg.jpg");
    magicSound = loadSound("./audio/magic_sound.mp3"); // when star object is hit
    metallicSound = loadSound("./audio/metallic.wav"); // when borders are hit
    blasterSound = loadSound("./audio/blaster.wav"); // when paddle is hit
}

function setup (){

    createCanvas(500,500);

    paddleXPos = 250; // default x pos
    paddleYPos = 492; // default y pos

    ballXPos = 250; // default x pos
    ballYPos = 250; // default y pos

    // assigned random default speeds in beginning
    ballXSpeed = 0;
    ballYSpeed = 0;

    circle(ballXPos, ballYPos, 12); // default starting pos

    // set random pos to star
    objectXPos = random(70, 430);
    objectYPos = random(70, 300);

}

function draw(){

    // draw our background image
    imageMode(CORNER);
    image(spaceBG, 0, 30, 500, 530);

    imageMode(CENTER);
    image(objectImage, objectXPos, objectYPos, 40, 40); // display star object

    // borders
    fill(2, 18, 71);
    noStroke();
    rectMode(CORNER);
    left = rect(0, 0, 30, 500); // left
    right = rect(470, 0, 30, 500); // right
    top = rect(0, 0, 500, 30); // top

    // ball
    strokeWeight(1);
    fill(255, 0, 0);

    // increment ball speed to move it
    ballXPos += ballXSpeed;
    ballYPos += ballYSpeed; 

    circle(ballXPos, ballYPos, 12); // default ball starting pos

    // move left
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        paddleXPos -= 3;
    }

    // move right
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        paddleXPos += 3;
    }

    // account for paddle hitting borders
    if (paddleXPos >= 390){ 
        paddleXPos = 390; // reset to right-most position possible
    } else if (paddleXPos <= 110) { 
        paddleXPos = 110; 
    }

    // account for ball hitting borders or paddle
    if (ballXPos >= 464){ // ball hits left border
        metallicSound.play();
        ballXSpeed *= -1.08;
    } else if (ballXPos <= 36){ // ball hits right border
        metallicSound.play();
        ballXSpeed *= -1.08;
    }

    // if ball hits top border
    if (ballYPos <= 36){
        metallicSound.play();
        ballYSpeed *= -1.08;
    }

    // if ball hits star, reset star to random position
    // if (ballXPos <= objectXPos+20 && ballXPos >= objectXPos-20 && ballYPos <= objectYPos+20 && ballYPos >= objectYPos-20){
    if (dist(ballXPos,ballYPos, objectXPos, objectYPos) < 25) {
        objectXPos = random(50, 450);
        objectYPos = random(50, 300);
        magicSound.play();
        points++;
        console.log("HIT");
    }

    // if the ball hits paddle 
    // left side of paddle
    if ((ballYPos >= paddleYPos-12) && (paddleXPos-81 < ballXPos) && (ballXPos < paddleXPos)){
        blasterSound.play();
        ballXSpeed = -1; // should move left
        ballYSpeed *= -1.08; 
    } 

    // right side of paddle
    if ((ballYPos >= paddleYPos-12) && (paddleXPos < ballXPos) && (ballXPos < paddleXPos+81)){
        blasterSound.play();
        ballXSpeed = 1; // should move right
        ballYSpeed *= -1.08; 
    } 

    // if ball falls through floor, reset to screen center
    if ((ballYPos > paddleYPos+12)){
        ballXPos = 250;
        ballYPos = 250;
        ballXSpeed = 0;
        ballYSpeed = 0;
        misses++; // increment misses
    }

    // can only start game if ball is in the center
    if (mouseIsPressed && ballXSpeed === 0 && ballYSpeed === 0 ){
        ballXSpeed = random(-2,2);
        ballYSpeed = random(1,2);
    }

    // paddle
    stroke(189, 189, 189);
    strokeWeight(10);
    strokeCap(ROUND);
    // var paddle = line(195,490,305,490);  // curved sides !!
    rectMode(CENTER);
    paddle = rect(paddleXPos, paddleYPos, 150, 5);

    // report the # of points earned & missed stars
    noStroke();
    fill(255);
    text("Points: " + points, 50, 60);
    text("Missed Stars: " + misses, 50, 90);

}





