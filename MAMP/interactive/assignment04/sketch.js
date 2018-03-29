let moles = [];
var score = 0;
var miss = 0;
var a,b,c,d,e,f,g;
var corsshair, crosshairhit;
var up, down, current;
var gamestart = 0;
var sunhit = 0;
function preload(){
	soundFormats('mp3', 'ogg');
	hits = loadSound('hit.mp3');
	miss = loadSound('miss.mp3');
	golden = loadSound('wall.mp3');
	crosshairnothit = loadImage("crosshair.png");
	crosshairhit = loadImage("hit.png");
	up = loadImage("up.png");
	down = loadImage("down.png");
	sun = loadImage("sun.png");

}
class Mole {
	constructor(x, y){
		this.xPos = x;
		this.yPos = y;
		this.state = 1;
		this.current = down;
		this.timer = random(1,2);
	}
	flipUp(){
		this.current = up;
		this.state = 1;
	}
	flipDown(){
		this.current = down;
		this.state = 0;
	}
	flipSun(){
		this.current = sun;
		this.state = 0;
	}	
		
}

function createDownMole(mole){
	image(mole.current, mole.xPos, mole.yPos, 75, 75);
	this.state = 0;
}

function flipUp(mole){
	mole.current = up;
	mole.state = 1;
}

function flipDown(mole){
	mole.current = down;
	mole.state = 0;
}
function flipSun(mole){
	mole.current = sun;
	mole.state = 2;
}

function resetscore(score){
	score = 0;
}

function update(mole){
	//if(frameCount > mole.seed && frameCount % 100 === 0 && mole.timer > 0){
	if(frameCount % 100 === 0 && mole.timer > 2.75 && mole.timer < 3){
		flipSun(mole);
		mole.timer--;		
	}
	else if(frameCount % 100 === 0 && mole.timer > 0){		
		flipDown(mole);
		mole.timer--;
	}
	else if(mole.timer <= 0){
		flipUp(mole);
		mole.timer = random(1,7);
	}

}

function setup(){
	createCanvas(800,600);
	background(128);
	imageMode(CENTER);
	a = new Mole(150, 150);
	b = new Mole(150, 250);
	c = new Mole(150, 350);
	d = new Mole(250, 150);
	e = new Mole(250, 250);
	f = new Mole(250, 350);
	g = new Mole(350, 150);
	h = new Mole(350, 250);
	i = new Mole(350, 350);
	moles.push(a);
	moles.push(b);
	moles.push(c);
	moles.push(d);
	moles.push(e);
	moles.push(f);
	moles.push(g);
	moles.push(h);
	moles.push(i);
	if(gamestart === 0){
		cursor();
		fill(255);
		rect(275,250,200,100);
		textSize(64);
		fill(0);
		text('Wack A Mole!', 200, 220);
		text('Start',315,320);
	}

}

function draw(){
	if(frameCount >= 2000){
		frameCount = 0;
		gamestart = 0;
		console.log(frameCount, gamestart);
		cursor();
		background(128);
		fill(0);
		textSize(64);
		text('Score: '+score, 250, 150);
		text('Game Over!', 230, 220);
		text('Suns hit: '+sunhit, 230, 290);
		resetscore(score);
	}
	if(gamestart === 1){	
		noCursor();
		crosshair_current = crosshairnothit;
		background(128);
		textSize(32);
		text('Timer: '+ (2000-frameCount)/100, 50,100);
		text("Score: "+ score, 50,50);
		for(let i = 0; i < moles.length; i++){
			createDownMole(moles[i]);
		}

		for(let i = 0; i < moles.length; i++){
			update(moles[i]);
		}

		if(mouseIsPressed){
			crosshair_current = crosshairhit;
		}
		else{
			crosshair_current = crosshairnothit;
		}
		image(crosshair_current, mouseX, mouseY, 50,50);
	}

}

function mousePressed(){
	var hit = false;
	if(gamestart === 1){	
		for(let i = 0; i < moles.length; i++){
			if(dist(mouseX, mouseY, moles[i].xPos, moles[i].yPos) <= 40) {
				if(moles[i].state === 1 ){
					hits.play();
					score++;
					hit = true;
				}
				if(moles[i].state === 2 ){
					golden.play();
					score+=5;
					hit = true;
					sunhit++;
				}				
			}
		}
		if(hit === false){
			miss.play();
			score--;
		}
	}
	if(mouseX > 275 && mouseX < 475 && mouseY < 350 && mouseY > 250 && gamestart === 0) {
		gamestart = 1;
	}
}