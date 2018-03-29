function setup() {
  // set the background size of our canvas
  createCanvas(1600, 800);

  //blue background
  background(173,216,230);

  //kirby text
  textSize(30)
  text("This is Kirby", 720,100);
  text("Say Hi to Kirby", 710, 135);
  //settings
  fill(255,192,203);
  strokeJoin(PROJECT);
  strokeWeight(10);
  //arms
  ellipse(600,370, 225, 125);
  ellipse(990,370, 225, 125);
  //body
  ellipse(800,400, 450, 450);
  //eyes
  fill(0,0,0);
  ellipse(750,330, 50, 130);
  ellipse(850,330, 50, 130);
  //feet
  fill(139,0,0);
  arc(670, 650, 240, 175, PI, 2*PI, CHORD);
  arc(930, 650, 240, 175, PI, 2*PI, CHORD);
  //mouth
  fill(139,0,0);
  strokeWeight(5);
  arc(800, 415, 50, 90, 0, PI, CHORD);
  //tongue
  noStroke();
  fill(240,128,128)
  ellipse(800, 444, 30, 25);
  //blush
  ellipse(705,425, 90, 50);
  ellipse(895,425, 90, 50);
  //eye whites
  fill(255,255,255);
  ellipse(760,305, 20, 50);
  ellipse(860,305, 20, 50); 
}
