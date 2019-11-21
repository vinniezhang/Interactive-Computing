var world; 
var shuttle;
var astro;

var currentImage = '#sky1'; // space bg
var container;
var asteroidContainer;
var bigBoyContainer;
var shuttleContainer;
var astroContainer;
var userPos;
var astroArray = [];
var spaceshipAudio;

function preload(){
    spaceshipAudio = loadSound("audio/spaceship.wav");
}

function setup(){

    noCanvas();

    world = new World('VRScene');

    container = new Container3D({x:0, y:1, z:-3});
    asteroidContainer = new Container3D({x:0, y:1, z:-3});
    bigBoyContainer = new Container3D({x:0, y:1, z:-3});
    shuttleContainer = new Container3D({});

    world.add(container); // holding donuts
    world.add(asteroidContainer); // hold asteroids
    world.add(bigBoyContainer);

    // Custom Cursor -- white
    // remove the default HUD ring
	world.camera.holder.removeChild( world.camera.cursor.tag );

	// add in something else in its place
	world.camera.cursor = new Ring({
		x:0, y:0, z:-1,
		red:255, green:255, blue:255,
        radiusInner: .02,
        radiusOuter: .03
    });
    
	// set it as a cursor element
	world.camera.cursor.tag.setAttribute('cursor', 'fuse: false');

	// add it to the world
	world.camera.holder.appendChild(world.camera.cursor.tag);
    
    // generating yellow stars
    for (let i = 0; i < 500; i++){
        
        let star = new Sphere({
            x: random(-55, 55), y: random(-70, 30), z: random(-55, 55),
            radius: random(0, .2),
            asset: "crater",
			red: random(215, 255), green: random(200, 225), blue: random(0, 130),
            
            // clicking on a star moves you to it
			clickFunction: function(me) {
                spaceshipAudio.play();
				world.slideToObject(me, 3000);
			}
		})

		world.add(star);
    }
    
    // generating blue planets
    for (let i = 0; i < 30; i++){
        
        let bluePlanet = new Sphere({
            x: random(-55, 55), y: random(-60, 60), z: random(-55, 55),
            radius: random(.4, .8),
            asset: "water",
			red: random(0, 150), green: random(150, 200), blue: random(200, 255),
            
            // clicking on a star moves you to it
			clickFunction: function(me) {
                spaceshipAudio.play();
				world.slideToObject(me, 3000);
			}
		})

		world.add(bluePlanet);
    }

    // generating red planets
    for (let i = 0; i < 15; i++){
    
        let redPlanet = new Sphere({
            x: random(-65, 65), y: random(-60, 60), z: random(-55, 55),
            radius: random(.8, 1),
            asset: "fire",
            red: random(220, 255), green: random(0, 30), blue: random(50, 100),
            rotationX: 45,
            
            // clicking on a star moves you to it
            clickFunction: function(me) {
                spaceshipAudio.play();
                world.slideToObject(me, 3000);
            }
        })

        world.add(redPlanet);
    }

    // generating moving donuts
    for (let i = 0; i < 10; i++){

        donut = new Torus({
            red: random(30, 125), green: random(30, 60), blue: random(100, 130),
            x: random(-55, 55), y: random(-60, 60), z: random(-55, 55),
            radius: random(.3, .7),
            radiusTubular: random(.05, .2), 
            arc: 360
        })

        container.addChild(donut);

    }

    // generating asteroid-rocks
    for (let i = 0; i < 40; i++){
        var asteroid = new Dodecahedron({
            x: random(-50, 50), y: random(-100, 100), z: random(-55, 55),
            radius: random(.2, .8),
            asset: "rock",
            red: random(85, 105), green: random(80, 95), blue: random(80, 130),
        });

        asteroidContainer.addChild(asteroid);
    }

    // bigger and darker asteroid rocks
    for (let i = 0; i < 15; i++){
        var bigBoy = new Dodecahedron({
            x: random(-60, 60), y: random(-30,30), z: random(-35, 35),
            radius: random(1.2, 1.6),
            asset: "rock",
            red: random(45, 55), green: random(40, 55), blue: random(50, 60),
        });

        bigBoyContainer.addChild(bigBoy);
    }

    // want to make the head of rocket part of camera cursor
    shuttleContainer.addChild(
        new OBJ({
            x:0, y:-1, z:-1.5,
            img: 'shuttle',
            asset: 'shuttleobj',
            mtl: 'shuttlemtl',
            scaleX: .12,
            scaleY: .05,
            scaleZ: .05,
            rotationX: 290
        })
    )
 
    // adding shuttle container to HUD cursor
    world.camera.cursor.addChild(shuttleContainer);

    // astronauts
    for (let i = 0; i < 5; i++){
        astro = new Astro();
        astroArray.push(astro); // add to array
    }
   
    world.setFlying(true);

 }

function draw(){

    if (mouseIsPressed){
        world.moveUserForward(0.05);
    }

    // collisions with an astronaut
    userPos = world.getUserPosition();
    for (let i = 0; i < astroArray.length; i++){

        let astroWorldPosition = astroArray[i].astronaut.getWorldPosition()
        console.log( "dist: ", dist(userPos.x, userPos.y, userPos.z, astroWorldPosition.x, astroWorldPosition.y, astroWorldPosition.z) )

        if (dist(userPos.x, userPos.y, userPos.z, astroWorldPosition.x, astroWorldPosition.y, astroWorldPosition.z) < 2){
            
            astroArray[i].astronaut.hide();
            astroArray[i].saucer.show();
            
            astroArray[i].saucer.x = astroWorldPosition.x;
            astroArray[i].saucer.y = astroWorldPosition.y;
            astroArray[i].saucer.z = astroWorldPosition.z;

        }

        astroArray[i].move();
    }
        
    container.spinY(-.02);
    container.spinX(-.05);
    container.spinZ(-.03);

    asteroidContainer.spinY(.05);
    asteroidContainer.spinZ(.02);

    bigBoyContainer.spinY(-.12);

}

// astronaut class
class Astro{

    constructor(){

        this.astroContainer = new Container3D({
            x: 0,
            y: 1, 
            z: -3
        })

        world.add(this.astroContainer);

        let globalX = random(-15, 15);
        let globalY = random(-10, 10);
        let globalZ = random(-10, 10);
        
        this.astronaut = new OBJ({
            x: globalX, 
            y: globalY, 
            z: globalZ,
            img: 'astro',
            asset: 'astroobj',
            mtl: 'astromtl',
            scaleX: .2,
            scaleY: .2,
            scaleZ: .2,
            rotationX: random(-50, 0),
            rotationY: random(-50, 30),
        });

        this.saucer = new OBJ({
            x: globalX, 
            y: globalY, 
            z: globalZ,
            img: 'saucer',
            asset: 'saucerobj',
            mtl: 'saucermtl',
            scaleX: .005,
            scaleY: .005,
            scaleZ: .005,
            rotationY: 100
        });

        this.saucer.hide();

        this.astronaut.parent = this;

        this.astroContainer.addChild(this.saucer);
        this.astroContainer.addChild(this.astronaut);
    }

    // container movement
    move() {
        this.astroContainer.spinX(.02);
        this.astroContainer.spinY(.01);
        this.astroContainer.spinY(.01);
    }

 }