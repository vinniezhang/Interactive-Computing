

var seedling; 
var seeds = [];
var expand = .25;
var onFlower;

function setup() {
    createCanvas(800,500);
    background(125, 209, 255);
}

function draw(){

    background(125, 209, 255);

    // go through seeds array
    for (var i = 0; i < seeds.length; i++){
             
        seeds[i].display();
        
         if (seeds[i].state === "falling") { // when first created
            seeds[i].drop();

            if (seeds[i].seedY >= 400){
                seeds[i].state = "expanding";
            }
        }
        
        if (seeds[i].state === "expanding"){

            seeds[i].seedY = 400; 

            if (seeds[i].radius < 30){
                seeds[i].radius += expand;
            } else {
                seeds[i].state = "growing";
            }

        }

        if (seeds[i].state === "growing"){

            seeds[i].displayStem();

            if (seeds[i].stemHeight > seeds[i].randomHeight){
               seeds[i].grow();
            } else {
                seeds[i].state = "blossom";
            }
       
        }

        if (seeds[i].state === "blossom"){

            seeds[i].displayStem();
            fill(seeds[i].r, seeds[i].g, seeds[i].b); // opaque flower center

            if (seeds[i].flowerRadius < seeds[i].randomFlowerSize){
                seeds[i].displayCenter();
                seeds[i].flowerRadius += 1;
            } else {
                seeds[i].state = "petals";
            }
        }

        if (seeds[i].state === "petals"){

            seeds[i].displayStem();
            noStroke();

            seeds[i].petalwidth = seeds[i].flowerRadius * 3;
            seeds[i].petalheight = seeds[i].flowerRadius;

            if (seeds[i].currentPetalWidth < seeds[i].petalwidth){
                seeds[i].displayPetals();
                seeds[i].currentPetalWidth += 1;
            } else {
                seeds[i].state = "rotate";
            }
            
            // flower center
            seeds[i].displayCenter();

        }

        if (seeds[i].state === "rotate"){

            seeds[i].displayStem();
            noStroke();

            // flower center
            fill(seeds[i].r, seeds[i].g, seeds[i].b);
            seeds[i].displayCenter();

            //seeds[i].displayPetals();
            seeds[i].rotatePetals();

            // EXTRA CREDIT: spins faster when mouse gets close
            if (dist(seeds[i].seedX, seeds[i].randomHeight, mouseX, mouseY) < 60){
                seeds[i].angle += 2;
            }

        }
    
    }

    // grass
    rectMode(CORNER);
    fill(110, 219, 114);
    noStroke();
    rect(0, 400, 800, 100); // grass y pos is at 400

}

// create a new Seed each time mouse is pressed
function mousePressed(){

    onFlower = false;

    // EXTRA CREDIT
    for (let i = 0; i < seeds.length; i++){
        if (dist(seeds[i].seedX, seeds[i].randomHeight, mouseX, mouseY) < 20){
            seeds[i].changeColor();
            onFlower = true;
        } 
    }

    if (onFlower === false){
        seedling = new Seed(mouseX, mouseY); // create new seed
        seeds.push(seedling); // push seed into array
    }

}

class Seed{

    constructor(seedX, seedY){

        this.seedX = seedX;
        this.seedY = seedY;
        this.radius = 5; // seed radius when falling
        this.color = 0; // default to black seed
        this.r = random(0,255);
        this.b = random(0,255);
        this.g = random(0,255);
        this.speed = 2; // to increment y pos
        this.state = "falling"; // starts falling when first created
        this.randomHeight = random(100, 350);
        this.randomFlowerSize = random(15, 30);
        this.stemHeight = 400;
        this.flowerRadius = 0;
        this.currentPetalWidth = 0; // so it can grow outwards
        this.petalwidth = this.flowerRadius * 3;
        this.petalheight = this.flowerRadius;

        this.angle = 0;
    }

    display() {
        fill(this.color);
        ellipse(this.seedX, this.seedY, this.radius, this.radius);
    }

    drop() {
        this.seedY += this.speed;
    }

    grow() {
        stroke(0);
        line(this.seedX, this.seedY, this.seedX, this.stemHeight);
        this.stemHeight -= 1;
    }

    displayCenter(){
        noStroke();
        ellipse(this.seedX, this.stemHeight, this.flowerRadius, this.flowerRadius);
    }

    displayStem(){
        stroke(0);
        line(this.seedX, this.seedY, this.seedX, this.stemHeight);
    }

    displayPetals(){
        fill(this.r,this.g,this.b, 100);
        rectMode(CENTER);
        rect(this.seedX, this.stemHeight, this.currentPetalWidth, this.petalheight);
        rect(this.seedX, this.stemHeight, this.petalheight, this.currentPetalWidth);
    }

    rotatePetals(){
        push();
        translate(this.seedX, this.randomHeight);
        rotate(radians(this.angle));
        fill(this.r,this.g,this.b, 100);
        rectMode(CENTER);
        rect(0, 0, this.currentPetalWidth, this.petalheight);
        rect(0, 0, this.petalheight, this.currentPetalWidth);
        pop();
        this.angle += .5;     
    }

    changeColor(){
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }

}

