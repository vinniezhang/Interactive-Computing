
var background;
var up, down, left, right;
var bed1, bed2;

var userBaby;
var crawl1, crawl2, crawl3;
var crawl_1, crawl_2, crawl_3;
var left_crawl1, left_crawl2, left_crawl3;
var bottle;
var door, doorPos;

var lives = 3;
var bottle, pacifier, blanket;
var bottleX, bottleY, pacifierX, pacifierY, blanketX, blanketY;
var bottleText = '0';
var pacifierText = '0'; 
var blanketText = '0';
var gameOver = false;
var itemsCollected = false;
var win = false;

var pressText = "";
var pressText2 = "Collect all of the items!";

var dingAudio, ouchAudio, gameOverAudio, winAudio, bounceAudio;


function preload(){

    dingAudio = loadSound('./audio/ding.wav');
    ouchAudio = loadSound('./audio/enemy.wav');
    gameOverAudio = loadSound('./audio/game_over.wav');
    winAudio = loadSound('./audio/win.wav');
    bounceAudio = loadSound('./audio/bounce.wav');

    bottle = loadImage('./images/bottle.png');
    pacifier = loadImage('./images/pacifier.png');
    blanket = loadImage('./images/blanket.png');

    door = loadImage('./images/door.png');

    background = loadImage("./images/background.jpg");
    up1 = loadImage('./images/babyUp/up1.png');
    up2 = loadImage('./images/babyUp/up2.png');
    up3 = loadImage('./images/babyUp/up3.png');
    up4 = loadImage('./images/babyUp/up4.png');

    down1 = loadImage('./images/babyDown/down1.png');
    down2 = loadImage('./images/babyDown/down2.png');
    down3 = loadImage('./images/babyDown/down3.png');
    down4 = loadImage('./images/babyDown/down4.png');

    left1 = loadImage('./images/babyLeft/left1.png');
    left2= loadImage('./images/babyLeft/left2.png');
    left3 = loadImage('./images/babyLeft/left3.png');
    left4 = loadImage('./images/babyLeft/left4.png');

    right1 = loadImage('./images/babyRight/right1.png');
    right2 = loadImage('./images/babyRight/right2.png');
    right3 = loadImage('./images/babyRight/right3.png');
    right4 = loadImage('./images/babyRight/right4.png');

    redBed = loadImage("./images/bed.png");

    crawl1 = loadImage("./images/crawling_right1.png");
    crawl2 = loadImage("./images/crawling_right2.png");
    crawl3 = loadImage("./images/crawling_right3.png");

    crawl_1 = loadImage("./images/cright1.png");
    crawl_2 = loadImage("./images/cright2.png");
    crawl_3 = loadImage("./images/cright3.png");

    left_crawl1 = loadImage("./images/crawling_left1.png");
    left_crawl2 = loadImage("./images/crawling_left2.png");
    left_crawl3 = loadImage("./images/crawling_left3.png");

}

function setup(){

    createCanvas(700, 600);

    userBaby = new Baby();
    whiteBaby = new whiteCrawl(-50, 330);
    blackBaby = new blackCrawl(-50, 490);
    leftBaby = new leftCrawl(650, 410);

    whiteBaby2 = new whiteCrawl(-400, 330);
    blackBaby2 = new blackCrawl(400, 490);
    leftBaby2 = new leftCrawl(300, 410);

    // draw our background image
    imageMode(CORNER);
    image(background, 0, 0, 700, 600);

    bed1 = new RightBed(550, 0, redBed, 2);
    bed3 = new RightBed(100, 0, redBed, 2);

    bed2 = new Bed(-50, 100, redBed, 3);
    bed4 = new Bed(-350, 100, redBed, 3);

    doorPos = random(150, 500);

    // randomly generate positions for items to collect
    bottleX = random(20, 150);
    bottleY = random(300, 470);

    pacifierX = random(210, 400);
    pacifierY = random(300, 450);

    blanketX = random(450, 620);
    blanketY = random(300, 470);

}

function draw(){
    
    // draw our background image
    imageMode(CORNER);
    image(background, 0, 0, 700, 600);

    // show collection item text
    fill(255);
    textSize(20);
    textStyle(BOLD);
    textFont('Helvetica');

    text(pressText, 60, 500);
    text(pressText2, 45, 530);

    // display door
    imageMode(CENTER);
    image(door, doorPos, 2, 70, 80);

    // displaying items to collect
    imageMode(CENTER);
    image(bottle, bottleX, bottleY, 50, 50);
    image(pacifier, pacifierX, pacifierY, 25, 25);
    image(blanket, blanketX, blanketY, 75, 75);

    // display beds
    bed1.move();
    bed1.display();

    bed3.move();
    bed3.display();

    bed2.move();
    bed2.display();

    bed4.move();
    bed4.display();

    whiteBaby.move();
    whiteBaby.display();

    leftBaby.move();
    leftBaby.display();

    blackBaby.move();
    blackBaby.display();

    whiteBaby2.move();
    whiteBaby2.display();

    leftBaby2.move();
    leftBaby2.display();

    blackBaby2.move();
    blackBaby2.display();

    // display baby
    userBaby.move();
    userBaby.display();

    // if user is about to jump over river
    if (pacifierText === "1" && bottleText === "1" && blanketText === "1"){

        itemsCollected = true;

        // show text to use spacebar to jump
        fill(255);
        textSize(20);
        textStyle(BOLD);
        textFont('Helvetica');

        pressText = "Press the spacebar";
        pressText2 = "to jump onto the beds!";
        text(pressText, 60, 500);
        text(pressText2, 45, 530);

    }

    // reset user position if user touches water
    if ((userBaby.y < 220 && userBaby.y > 10)){ // in water

        if ((userBaby.y >= bed1.y+40 && userBaby.y <= bed1.y+100) && (userBaby.x >= bed1.x+50 && userBaby.x <= bed1.x+160)){
            userBaby.x -= bed1.speed;
        }

        else if ((userBaby.y >= bed3.y+40 && userBaby.y <= bed3.y+100) && (userBaby.x >= bed3.x+50 && userBaby.x <= bed3.x+160)){
            userBaby.x -= bed3.speed;
        }

        else if ((userBaby.y >= bed2.y+30 && userBaby.y <= bed2.y+100) && (userBaby.x >= bed2.x+50 && userBaby.x <= bed2.x+160)){
            userBaby.x += bed2.speed;
        }

        else if ((userBaby.y >= bed4.y+30 && userBaby.y <= bed4.y+100) && (userBaby.x >= bed4.x+50 && userBaby.x <= bed4.x+160)){
            userBaby.x += bed4.speed;
        }

        else { // touching water, reset baby
            userBaby.x = 350;
            userBaby.y = 560;
            ouchAudio.play();
            userBaby.currentCycle = userBaby.upCycle;
            userBaby.currentImage = 0;
            lives--;
        }

    }

    // reset user position if baby collisions occur
    if (dist(blackBaby.x, blackBaby.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }

    } else if (dist(whiteBaby.x, whiteBaby.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }

    } else if (dist(leftBaby.x, leftBaby.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }

    } else if (dist(whiteBaby2.x, whiteBaby2.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }

    } else if (dist(leftBaby2.x, leftBaby2.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }
    } else if (dist(blackBaby2.x, blackBaby2.y, userBaby.x, userBaby.y) < 35){
        userBaby.x = 350;
        userBaby.y = 560;
        userBaby.currentCycle = userBaby.upCycle;
        userBaby.currentImage = 0;
        lives--;

        // prevents this audio clip from playing over gameOver audio
        if (lives !== 0){
            ouchAudio.play();
        }

    }

    // if user collects items, make them disappear
    if (dist(bottleX, bottleY, userBaby.x, userBaby.y) < 30){
        bottleX = undefined;
        bottleY = undefined;
        bottleText = '1';   
        dingAudio.play();
    } else if (dist(pacifierX, pacifierY, userBaby.x, userBaby.y) < 15){
        pacifierX = undefined;
        pacifierY = undefined;
        pacifierText = '1';
        dingAudio.play();
    } else if (dist(blanketX, blanketY, userBaby.x, userBaby.y) < 40){
        blanketX = undefined;
        blanketY = undefined;
        blanketText = '1';
        dingAudio.play();
    } 

    // text
    textSize(22);
    textFont('Consolas');
    stroke(0);
    strokeWeight(1.5);
    fill(255);
    text('Lives: ', 30, 70);
    fill(255, 170, 66);
    textSize(28);
    text(lives, 110, 70); // number --> different color

    textSize(16);
    fill(255);
    text('Bottle: ' + bottleText, 30, 100);
    text('Pacifier: ' + pacifierText, 30, 130);
    text('Blanket: ' + blanketText, 30, 160);

    // lost game
    if (lives === 0){

        if (gameOver === false) {
            gameOver = true;
            gameOverAudio.play();
        }

        // prevent going into water and losing negative lives
        userBaby.y = constrain(userBaby.y, 230, 600);

        fill(255);
        textSize(35);
        textStyle(BOLD);
        textFont('Helvetica');
        text('YOU LOST !', 270, 150);
        text('NO NAP FOR YOU !', 210, 200);
        pressText = '';
        pressText2 = '';

        // gets rid of all objects on the screen
        blackBaby.x = undefined;
        whiteBaby.x = undefined;
        leftBaby.x = undefined;
        blackBaby2.x = undefined;
        whiteBaby2.x = undefined;
        leftBaby2.x = undefined;
        bottleX = undefined;
        blanketX = undefined;
        pacifierX = undefined;
        blackBaby.y = undefined;
        whiteBaby.y = undefined;
        leftBaby.y = undefined;
        blackBaby2.y = undefined;
        whiteBaby2.y = undefined;
        leftBaby2.y = undefined;
        bottleY = undefined;
        blanketY = undefined;
        pacifierY = undefined;
        bed1.x = undefined;
        bed1.y = undefined;
        bed2.x = undefined; 
        bed2.y = undefined;
        bed3.x = undefined;
        bed3.y = undefined;
        bed4.x = undefined; 
        bed4.y = undefined;
    }

    // if baby reaches the door, win game
    if ((userBaby.x >= doorPos-35) && (userBaby.x <= doorPos+35) && userBaby.y <= 0){

        if (win === false){
            win = true;
            winAudio.play();
        }

        pressText = '';
        pressText2 = '';

        // gets rid of all objects on the screen
        blackBaby.x = undefined;
        whiteBaby.x = undefined;
        leftBaby.x = undefined;
        blackBaby2.x = undefined;
        whiteBaby2.x = undefined;
        leftBaby2.x = undefined;
        bottleX = undefined;
        blanketX = undefined;
        pacifierX = undefined;
        blackBaby.y = undefined;
        whiteBaby.y = undefined;
        leftBaby.y = undefined;
        blackBaby2.y = undefined;
        whiteBaby2.y = undefined;
        leftBaby2.y = undefined;
        bottleY = undefined;
        blanketY = undefined;
        pacifierY = undefined;
        bed1.x = undefined;
        bed1.y = undefined;
        bed2.x = undefined; 
        bed2.y = undefined;
        bed3.x = undefined;
        bed3.y = undefined;
        bed4.x = undefined; 
        bed4.y = undefined;

        userBaby.x = undefined;
        userBaby.y - undefined;

    }

    if (win){

        fill(255);
        textSize(35);
        textStyle(BOLD);
        textFont('Helvetica');
        text('YOU WIN!', 270, 150);
        textSize(28);
        text('(click anywhere to go back)', 180, 200);

        pressText = '';
        pressText2 = '';

        if (mouseIsPressed){
            // change canvas back to overworld
        }
    }

}

 // if baby presses spacebar and all items are collected--> to jump 50 steps up
 function keyPressed(){
    if (keyCode === 32 && itemsCollected){
        userBaby.y -= 65;
        bounceAudio.play();
    }
 }

class Bed{

    constructor (startX, startY, startGraphic, startSpeed) {

        this.x = startX;
        this.y = startY;
        this.graphic = startGraphic;
        this.speed = startSpeed;

    }
  
    display() {
        imageMode(CORNER);
        image(this.graphic, this.x, this.y, 240, 180);
    }
  
    move() {
      this.x += this.speed;
  
      // if it hits the edge, wrap around screen
      if (this.x > width) {
          this.x = -125;
      }
    }
}

class RightBed{

    constructor (startX, startY, startGraphic, startSpeed) {

        this.x = startX;
        this.y = startY;
        this.graphic = startGraphic;
        this.speed = startSpeed;

    }
  
    display() {
        imageMode(CORNER);
        image(this.graphic, this.x, this.y, 240, 180);
    }
  
    move() {
      this.x -= this.speed;
  
      // if it hits the left edge, wrap around screen, to the right
      if (this.x < -180) {
          this.x = 700;
      }
    }
}

function leftCrawl(xPos, yPos){
    
    this.x = xPos;
    this.y = yPos;
    this.speed = 1;

    this.crawlCycle = [];
    this.currentImage = 0;
    
    // only have 3 frames, so duplicating many times so the animation is smoother
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl1);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl2);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);
    this.crawlCycle.push(left_crawl3);

    this.display = function(){

        this.currentImage += 1;

        if (this.currentImage >= 27) { // reset crawl cycle
            this.currentImage = 0;
        }

        image(this.crawlCycle[ this.currentImage ], this.x, this.y, 80, 90);

    }

    this.move = function(){

        this.x -= this.speed;

        // if it hits the edge, wrap around screen
        if (this.x < -70) {
            this.x = 725;
        }

    }

}

function blackCrawl(xPos, yPos){
    
    this.x = xPos;
    this.y = yPos;
    this.speed = 1.4;

    this.crawlCycle = [];
    this.currentImage = 0;
    
    // only have 3 frames, so duplicating many times so the animation is smoother
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_1);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_2);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);
    this.crawlCycle.push(crawl_3);

    this.display = function(){

        this.currentImage += 1;

        if (this.currentImage >= 27) { // reset crawl cycle
            this.currentImage = 0;
        }

        image(this.crawlCycle[ this.currentImage ], this.x, this.y, 80, 90);

    }

    this.move = function(){

        this.x += this.speed;

        // if it hits the edge, wrap around screen
        if (this.x > width) {
            this.x = -125;
        }

    }

}

function whiteCrawl(xPos, yPos){
    
    this.x = xPos;
    this.y = yPos;
    this.speed = 1;

    this.crawlCycle = [];
    this.currentImage = 0;
    
    // only have 3 frames, so duplicating multiple times so the animation is smoother
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl1);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl2);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);
    this.crawlCycle.push(crawl3);

    this.display = function(){

        this.currentImage += 1;

        if (this.currentImage >= 27) { // reset crawl cycle
            this.currentImage = 0;
        }

        imageMode(CENTER);
        image(this.crawlCycle[ this.currentImage ], this.x, this.y, 80, 90);

    }

    this.move = function(){

        this.x += this.speed;

        // if it hits the edge, wrap around screen
        if (this.x > width) {
            this.x = -125;
        }

    }

}

function Baby() {

    // start position of baby always at bottom of screen
    this.x = 350;
    this.y = 560;

    // set up holders for all of our walk cycle images
    this.leftCycle = [];
    this.rightCycle = [];
    this.upCycle = [];
    this.downCycle = [];

    this.currentImage = 0;
    this.currentCycle = this.upCycle;

    // load in all walk cycle images
    for (var i = 1; i < 5; i++) {
        
        var downFile = "down" + nf(i,1) + ".png";
        var upFile = "up" + nf(i,1) + ".png";
        var leftFile = "left" + nf(i,1) + ".png";
        var rightFile = "right" + nf(i,1) + ".png";

        this.downCycle.push( loadImage("images/babyDown/" + downFile) )
        this.upCycle.push( loadImage("images/babyUp/" + upFile) )
        this.leftCycle.push( loadImage("images/babyLeft/" + leftFile) )
        this.rightCycle.push( loadImage("images/babyRight/" + rightFile) )
    
    }

    this.display = function() {
    
      if (keyIsPressed && frameCount % 10 == 0) {
        this.currentImage += 1;
      }

      if (this.currentImage >= 4) {
        this.currentImage = 0;
      }

      imageMode(CENTER);
      image(this.currentCycle[ this.currentImage ], this.x, this.y, 45, 65);

    }
  
    // move baby
    this.move = function(){

        // so baby stays within the screen
        this.x = constrain(this.x, 20, 680);
        this.y = constrain(this.y, -10, 580);

        if (keyIsDown(65)) {
            this.x -= 1.5;
            this.currentCycle = this.leftCycle;
        }

        if (keyIsDown(68)) {
            this.x += 1.5;
            this.currentCycle = this.rightCycle;
        }

        if (keyIsDown(87)) {
            this.y -= 1.5;
            this.currentCycle = this.upCycle;
        }

        if (keyIsDown(83)) {
            this.y += 1.5;
            this.currentCycle = this.downCycle;
        }
    }
}