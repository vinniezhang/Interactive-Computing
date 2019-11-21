function setup() {

    // set the background size of our canvas
    createCanvas(700, 500);
    background(186, 226, 255)

    // table
    strokeWeight(2)
    stroke(140)
    fill(195)
    rect(0,315,700,200)

    //  left plant 
    fill(0,220,160)
    strokeWeight(3)
    stroke(50,220,120)
    ellipse(275,220,90,110)
  
    // spikes on left plant
    stroke(46, 184, 107)

    // left half
    line(237,185,247,190)
    line(237,198,247,203)
    line(237,213,247,218)
    line(237,228,247,233)
    line(237,243,247,248)

    line(250,180,260,185)
    line(250,195,260,200)
    line(250,210,260,215)
    line(250,225,260,230)
    line(250,240,260,245)
    
    // middle columns
    
    // top spikes
    line(272,163,272,171)
    line(254,168,258,173)
    line(291,172,296,167) 

    line(265,176,270,181)
    line(265,196,270,201)
    line(265,216,270,221)
    line(265,236,270,241)
 
    line(280,175,285,170) 
    line(275,195,280,190) 
    line(275,214,280,209)  
    line(275,231,280,226) 
    line(275,248,280,243) 

    // right half
    line(290,183,300,178) 
    line(290,195,300,190) 
    line(290,208,300,203) 
    line(290,222,300,217)  
    line(290,235,300,230) 
    line(290,248,300,243)   

    line(305,197,315,192)
    line(305,210,315,205)
    line(305,224,315,219)
    line(305,237,315,232)
    line(307,250,317,245)

    //  middle plant 
    fill(0,220,160)
    strokeWeight(3)
    stroke(50,220,120)
    ellipse(360,220,50,280)

    // right plant
    fill(0,220,160)
    strokeWeight(3)
    noStroke()
    ellipse(494, 190, 25, 43)
    ellipse(460, 205, 80, 35)
    ellipse(435, 220, 68, 180)

    // flower on right plant
    fill(255, 112, 198)
    stroke(240, 84, 178)
    strokeWeight(2)
    ellipse(455,165,26,26)

    fill(252, 96, 222)
    ellipse(465,155,24,24)

    fill(252, 96, 190)
    ellipse(452,154,23,23)

    fill(250, 145, 209)
    stroke(240, 84, 178)
    strokeWeight(3)
    ellipse(459,159,17,17)

    // flower #1 on tall plant
    fill(220,0,0)
    stroke(220,60,100)
    ellipse(377,120,18,5)

    beginShape(TRIANGLES);
    vertex(374, 120);
    vertex(377, 110);
    vertex(379, 120);
    vertex(374, 120);
    vertex(377, 130);
    vertex(379, 120);
    endShape();

    fill(252, 247, 83)
    ellipse(377,120,8,8)

    // flower #2 on tall plant
    fill(247, 134, 35)
    stroke(247, 134, 35)
    ellipse(350,200,35,10)
    ellipse(350,200,10,30)
    
    fill(255, 201, 249)
    stroke(255, 201, 249)
    ellipse(350,200,6,6)

    // colors for pot
    fill(179, 91, 54)
    strokeWeight(3)
    stroke(117, 59, 34)

    // top part of pot
    beginShape()
    vertex(200,250);
    vertex(500,250);
    vertex(470,280);
    vertex(230,280);
    vertex(200,250)
    endShape(CLOSE)

    // bottom part of box
    beginShape()
    vertex(230,280);
    vertex(470, 280);
    vertex(470,400);
    vertex(230,400);
    vertex(230,280)
    endShape(CLOSE)

    // sun
    fill(255, 246, 71)
    stroke(255, 227, 71)
    circle(700, 0, 200, 200)

    // rays
    stroke(255, 246, 71)
    strokeWeight(5)
    line(570, 20, 490, 35)
    line(575, 52, 485, 85)
    line(590, 80, 505, 135)
    line(612, 105, 550, 165)
    line(643, 125, 605, 185)
    line(675, 136, 660, 200)
    
  }