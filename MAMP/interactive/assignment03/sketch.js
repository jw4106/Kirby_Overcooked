var bg, blowfish, magikarp, xPos, yPos, xSpeed, ySpeed;
var accel;
var score = 0;
var highscore = 0;
var gamestart = false;
var character = "";
var easy = 5;
var hard = 10; 
var mode = "";
var birds;
var minex = 900;
var miney = 300;
var gameover = "";
var anglerspeed = 2;
function preload(){
	bg = loadImage('bg.jpg');
	blowfish = loadImage('blowfish.jpg');
	magikarp = loadImage('magikarp.png');
	worm = loadImage('worm.png');
	mines = loadImage('angler.png');

}

function setup() {
	var theCanvas = createCanvas(1100,630);
	xPos = 550;
	yPos = 315;
	xSpeed = 0;
	ySpeed = 0;
	xWorm = random(width - 100);
	yWorm = random(height - 100);
	
	xBf = 375;
	yBf = 300;
	bfsize = 50;
	xMk = 675;
	yMk = 300;
	mksize = 50;

}

function draw(){
	if (gamestart == false){
		background(bg, 1100,630);
		textSize(32);
		fill(255);
		text(gameover, 475, 150);
		text("Please Hover Over a Character To Choose: ", 250, 200);
		textSize(24);
		text("Easy", xBf, yBf + 80);
		text("Hard", xMk, yMk + 80);
		image(blowfish, xBf, yBf, bfsize, bfsize);
		image(magikarp, xMk, yMk, mksize, mksize);

		if (xPos > width) {xPos = 0;}
		if (xPos < 0) {xPos = width;}
		if (yPos > height) {yPos = 0;}
		if (yPos < 0) {yPos = height;}
		if(dist(mouseX, mouseY, xBf, yBf) <= 50) {
			character = "blowfish";
			mode = "easy";
			accel = .1;
			gamestart = true;
		}
		if(dist(mouseX, mouseY, xMk, yMk) <= 50) {
			character = "magikarp";
			mode = "hard";
			accel = .2;
			gamestart = true;
		}


	}
	if (gamestart == true){
		background(bg, 1100,630);
		textSize(32);
		text("Score: "+ score, 50, 50);
		text("High Score: "+ highscore, 50, 100);
		if (keyIsDown(65) && xPos > 50 ) {xSpeed -= accel;}
		if (keyIsDown(68) && xPos < 1050) {xSpeed += accel;}
		if (keyIsDown(87) && yPos > 50) {ySpeed -= accel;}
		if (keyIsDown(83) && yPos < 580) {ySpeed += accel;}
		
		if (mode == "easy"){
			xSpeed = constrain(xSpeed, easy * -1, easy);
		    ySpeed = constrain(ySpeed, easy * -1, easy);
		}

	    if (mode == "hard"){
			xSpeed = constrain(xSpeed, hard * -1, hard);
		    ySpeed = constrain(ySpeed, hard * -1, hard);
		}

		xPos += xSpeed;
		yPos += ySpeed;
		
		if (xPos > width - 40) {xSpeed = -2}
		if(xPos < 10) {xSpeed = 2;}
		if (yPos > height - 40) {ySpeed = -2}
		if(yPos < 10) {ySpeed = 2;}


		image(worm, xWorm , yWorm, 50, 50);
		image(mines, minex, miney, 50, 50);
		if(xPos > minex){
			minex += anglerspeed;
		}
		else if(xPos < minex){
			minex -= anglerspeed;
		}
		if(yPos > miney){
			miney += anglerspeed;
		}
		else if(yPos < miney){
			miney -= anglerspeed;
		}

		if(character == "magikarp"){
			image(magikarp, xPos-15, yPos-15, 50, 50);
		}
		if(character == "blowfish"){
			image(blowfish, xPos-15, yPos-15, 50, 50);
		}
		if (xPos > width) {xPos = 0;}
		if (xPos < 0) {xPos = width;}
		if (yPos > height) {yPos = 0;}
		if (yPos < 0) {yPos = height;}
		if(dist(xPos, yPos, xWorm, yWorm) <= 40) {
			xWorm = random(0, width-115);
			yWorm = random(200, height-215);
			score += 1;
		}
		if(document.getElementById("godmode").checked != true){
			if(dist(xPos, yPos, minex, miney) <= 40) {
				minex = 900;
				miney = 300;
				xPos = 550;
				yPos = 315;
				highscore = max(highscore, score);
				score = 0;		
				xSpeed = 0;
				ySpeed = 0;
				gameover = "Game Over!!!";
				gamestart = false;
			}
		}
	}

}

function updateRange( theRange ) {
  // grab the data from the range
  anglerspeed = int(theRange.value);
}