var rectwidth = 330;
var score = 0;
var misses  = 0;

var ballX = 400;
var ballY = 300;
var speedX, speedY;
var Emoji, xEmoji, yEmoji, bg;
var speedLevel = 0;
var hit, miss, wall;

var gamestart = false;

function preload(){
	soundFormats('mp3', 'ogg');
	hit = loadSound('hit.mp3');
	miss = loadSound('miss.mp3');
	wall = loadSound('wall.mp3');
	Emoji = loadImage('emoji.png');
	bg = loadImage('bg.png')
	imageMode(CENTER);
}

function setup(){
	createCanvas(800,630);
	rectMode(CORNER);
	xEmoji = random(75, width-115);
	yEmoji = random(75, height-215);
	speedX = random(3, 6);
	speedY = random(3, 6);
}

function draw(){
	//score
	background(128);
	background(bg, 800, 600);
	//color(255,0,0);
	textSize(20);
	text("Your Score: "+ score, 50, 50);
	text("Misses: "+ misses, 50, 75);
	text("Speed Increased: " + speedLevel+"x", 50, 100);
	fill(128,128,128);
	noStroke();
	rect(0,0, 800, 15);
	fill(0,0,0);
	//ball speed
	ellipse(ballX, ballY, 40, 40);
	ballX += speedX;
	ballY += speedY;

	//ball bounce
	if(ballX > width - 40 || ballX < 40){
		speedX *= -1;
		wall.play();
	}
	if(ballY < 35){
		speedY *= -1;
		wall.play();		
	}
	if(ballY > 600){
		misses += 1;
		ballX = 400;
		ballY = 300;
		speedX = random(3, 6);
		speedY = random(3, 6);
		speedLevel = 0;
		miss.play();
	}

	//paddle
	fill(0,0,0);
	rect(rectwidth, 580, 140, 20);

	if(keyIsDown(65) && rectwidth > 20){
		rectwidth -= 7;
	}
	if(keyIsDown(68) && rectwidth < 640){
		rectwidth += 7;
	}

	//collision
	if(ballY > 560 && (ballX < rectwidth + 140 && ballX > rectwidth)){
		speedY *= -1;
		wall.play();
		if(speedX > 0){
			speedX += .2;
		}
		if(speedX < 0){
			speedX -= .2;
		}
		if(speedY > 0){
			speedY += .2;
		}
		if(speedY < 0){
			speedY -= .2;
		}
		speedLevel++;
	}

	if (ballX > width) {
		ballX = 0;
	}
	if (ballX < 0) {
		ballX = width;
	}
	if (ballY > height) {
		ballY = 0;
	}
	if (ballY < 0) {
		ballY = height;
	}

	if(dist(ballX, ballY, xEmoji+50, yEmoji+50) <= 50) {
		hit.play();
		xEmoji = random(75, width-115);
		yEmoji = random(75, height-215);
		score += 1;
	}
	image(Emoji, xEmoji, yEmoji, 100, 100);
}
