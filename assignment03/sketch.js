
var bgImage, apple, bottle, can, paper, straw, trashCan;
var Trump, Greta;
var trashArray;
var paddleXPos, paddleYPos, trashXPos, trashYPos, itemYSpeed;
var randomNum, randomTrashItem, randomXPos, randomYPos;
var woohooSound, wooSound, ughSound, failSound;
var points = 0;
var lives = 3;
var started = false;
var level;
var userSpeed = 4;

function preload (){
    bgImage = loadImage("./images/landfill.jpg");
    apple = loadImage("./images/apple.png");
    bottle = loadImage("./images/bottle.png");
    can = loadImage("./images/can.png");
    paper = loadImage("./images/paper.png");
    straw = loadImage("./images/straw.png");
    trashCan = loadImage("./images/trash.png");
    Trump = loadImage("./images/trump2.png");
    Greta = loadImage("./images/greta2.png");
    wooSound = loadSound("./audio/woo.wav"); // when trump collected
    woohooSound = loadSound("./audio/woohoo.wav"); // when garbage collected
    ughSound = loadSound("./audio/ugh.wav"); // when greta falls
    failSound = loadSound("./audio/you_failed.mp3") // game over
}

function setup(){
    createCanvas(700,500); // width: 700, height: 500
    background(110, 230, 142);

    paddleXPos = 350; // default x pos
    paddleYPos = 480; // default y pos

    trashArray = [apple, bottle, can, paper, straw, Trump, Greta];

    // randomly choose from different trash types
    randomNum = int(random(0,7));
    randomTrashItem = trashArray[randomNum];

    randomXPos = random(60, 640);
    randomYPos = 0;

    itemYSpeed = 0;
    
}

var gameOver = false;

function draw(){

    // can only start game level has been selected and item is at 0 speed
    if (level !== undefined && itemYSpeed === 0){
        
        started = true;

        if (level === 'Easy Mode'){
            itemYSpeed = random(1,3);
        } else if (level === 'Normal Mode'){
            itemYSpeed = random(3,5); 
        } else if (level === 'Hard Mode'){
            itemYSpeed = random(5,8);
        }

    }

    // user selecting difficultly level (item speed)
    if (keyIsDown(78)){
        level = 'Normal Mode';
    } else if (keyIsDown(72)) {
        level = 'Hard Mode';
    } else if (keyIsDown(69)){
        level = 'Easy Mode';
    }
    
    console.log(started)

    // display start screen if the game hasn't yet started
    if (started === false){
        background(232, 158, 67);
        fill(140, 85, 8);
        textSize(22);

        textFont('Arial');
        text("Select a Difficulty Level to Start:", 190, 190);
        textStyle(BOLD);
        text("Press <E> for Easy, <N> for Normal, or <H> for Hard", 85, 250);
    } else {
        
        // draw background image
        imageMode(CORNER);
        image(bgImage, 0, 0, 700, 500);

        // key presses to move garbage can
        // move left
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            paddleXPos -= userSpeed; // should change to userSpeed
        }

        // move right
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            paddleXPos += userSpeed; // should change to userSpeed
        }

        // account for paddle hitting borders
        if (paddleXPos >= 642){ 
            paddleXPos = 642; // reset to right-most position possible
        } else if (paddleXPos <= 55) { 
            paddleXPos = 55; 
        }

        randomYPos += itemYSpeed; // start falling object

        // if 100 points reached --> win
        if (points >= 100){

            if (gameOver === false) {
                gameOver = true;
            }
                        
            // undefined so no new trash object appears at the top
            randomYPos = undefined;
            randomXPos = undefined;
            itemYSpeed = 0; 

            fill("white");
            textSize(25);
            text("YOU WIN!", 280, 210);
            text("GOOD JOB PROTECTING THE EARTH!", 120, 250);
            textSize(15);
            text("Click anywhere to try again.", 260, 290);
        }

        // if all 3 lives are lost --> game over
        if (lives === 0){

            // undefined so no new trash object appears at the top
            randomYPos = undefined;
            randomXPos = undefined;
            itemYSpeed = 0; 
            
            if (gameOver === false) {
                gameOver = true;
                failSound.play();
            }

            fill("white");
            textSize(25);
            text("YOU LOSE!", 280, 210);
            text("GOOD JOB DISAPPOINTING MOTHER NATURE!", 65, 250);
            textSize(15);
            text("Click anywhere to try again.", 260, 290);
        }

        // if we are in game over mode
        if (gameOver) {

            if (mouseIsPressed) {
                
                gameOver = false;

                // RESET GAME
                lives = 3;
                points = 0;
                started = false;
                level = undefined;

                randomXPos = random(60, 640);
                randomYPos = 0;

                if (level === 'Easy Mode'){
                    itemYSpeed = random(1,3);
                } else if (level === 'Normal Mode'){
                    itemYSpeed = random(3,5); 
                } else if (level === 'Hard Mode'){
                    itemYSpeed = random(5,8);
                }

                randomYPos += itemYSpeed; // start falling object
               
            }
        }

        // draw garbage can paddle to catch falling garbage
        imageMode(CENTER);
        image(trashCan, paddleXPos, paddleYPos, 150, 200);

        // draw random trash item
        imageMode(CENTER);

        if (randomTrashItem === Greta){
            image(randomTrashItem, randomXPos, randomYPos, 85, 75);
        } else {
            image(randomTrashItem, randomXPos, randomYPos, 60, 75);
        }

        // if garbage is caught
        if (randomYPos >= paddleYPos - 100 && randomXPos <= paddleXPos + 75 && randomXPos >= paddleXPos - 75){

            if (randomTrashItem === Trump){ // plus 10 points
                wooSound.play();
                points += 10; // increment
            } else if (randomTrashItem === Greta) { // minus 5 points and lose a life
                ughSound.play();
                lives--;
            } else if (randomTrashItem !== Greta) { // plus 5 points
                woohooSound.play();
                points += 5;
            }

            // resetting all variables
            randomNum = int(random(0,7));
            randomTrashItem = trashArray[randomNum];
            randomXPos = random(60, 640);
            randomYPos = 0;

            if (level === 'Normal Mode' && points < 100 && lives > 0){
                itemYSpeed = random(3,5); 
            } else if (level === 'Hard Mode' && points < 100 && lives > 0){
                itemYSpeed = random(5,8);
            } else if (level === 'Easy Mode' && points < 100 && lives > 0){
                itemYSpeed === random(1,3);
            }
            
        } else if (randomYPos >= 480 && randomTrashItem !== Greta) { // not caught
            lives--;
            ughSound.play();

            // resetting all variables
            randomNum = int(random(0,7));
            randomTrashItem = trashArray[randomNum];
            randomXPos = random(60, 640);
            randomYPos = 5;
            
            if (level === 'Normal Mode' && points < 100 && lives > 0){
                itemYSpeed = random(3,5); 
            } else if (level === 'Hard Mode' && points < 100 && lives > 0){
                itemYSpeed = random(5,8);
            } else if (level === 'Easy Mode' && points < 100 && lives > 0){
                itemYSpeed === random(1,3);
            }

        } else if (randomYPos >= 480 && randomTrashItem === Greta){
            // resetting all variables
            randomNum = int(random(0,7));
            randomTrashItem = trashArray[randomNum];
            randomXPos = random(60, 640);
            randomYPos = 5;
            
            if (level === 'Normal Mode' && points < 100 && lives > 0){
                itemYSpeed = random(3,5); 
            } else if (level === 'Hard Mode' && points < 100 && lives > 0){
                itemYSpeed = random(5,8);
            } else if (level === 'Easy Mode' && points < 100 && lives > 0){
                itemYSpeed === random(1,3);
            }
        }

        // display points 
        noStroke();
        fill(255);
        textSize(16);
        text("Level: " + level, 30, 50);
        textSize(12);
        text("POINTS: " + points, 30, 80);
        text("LIVES: " + lives, 30, 100);
        fill('red');
        text("Catch Greta and LOSE A LIFE", 30, 460);
        fill('green');
        text("Catch Trump for DOUBLE POINTS", 30, 480);

    }
    
}

function updateSpeed(clickedSpeed) {
    userSpeed = int(clickedSpeed.value);
  }