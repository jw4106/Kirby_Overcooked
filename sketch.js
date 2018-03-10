var fridge,burger,meat,kirby_move, kirby_stop, stove,table,tomato,cabbage,stove, map;
var kirby;

function preload(){
	kirby_run = loadGif("assets/kirbyrun.gif");
	kirby_run_left = loadGif("assets/kirbyrunleft.gif");
	kirby_move = loadGif("assets/kirbymove.gif");
	kirby_stop = loadImage("assets/kirbystop.png");
	kirby_move_left = loadGif("assets/kirbymoveleft.gif");
	kirby_stop_left = loadImage("assets/kirbystopleft.png");
	map = loadImage("assets/map.jpg");
}

class Kirby{
	constructor()
	{
		this.xPos = 400;
		this.yPos = 300;
		this.state = kirby_stop;
	}
	move()
	{
		if (keyIsDown(65) && keyIsDown(16) && this.xPos > 0)
		{
			this.xPos -= 4;
			this.state = kirby_run_left;
		}
		else if (keyIsDown(65) && this.xPos > 0 )
		{
			this.xPos -= 2;
			this.state = kirby_move_left;
		}

		if (keyIsDown(68) && keyIsDown(16) && this.xPos < 750)
		{
			this.xPos += 4;
			this.state = kirby_run;
		}
		else if (keyIsDown(68) && this.xPos < 750)
		{
			this.xPos += 2;
			this.state = kirby_move;
		}

		if (keyIsDown(87) && keyIsDown(16) && this.yPos > 0)
		{
			this.yPos -= 4;
			this.state = kirby_run;
		}
		else if (keyIsDown(87) && this.yPos > 0)
		{
			this.yPos -= 2;
			this.state = kirby_move;
		}

		if (keyIsDown(83) && keyIsDown(16) && this.yPos < 550)
		{
			this.yPos += 4;
			this.state = kirby_run;
		}
		else if (keyIsDown(83) && this.yPos < 550)
		{
			this.yPos += 2;
			this.state = kirby_move;
		}

		if (!keyIsDown(65) && !keyIsDown(68) && !keyIsDown(87) && !keyIsDown(83))
		{
			if(this.state === kirby_move)
				{
					this.state = kirby_stop;
				}
			if(this.state === kirby_move_left)
			{
				this.state = kirby_stop_left;
			}
		}
	}
	display()
	{
		image(this.state, this.xPos, this.yPos, 50,50);
	}
}

function setup(){
	createCanvas(800,600);
	background(128);
	kirby = new Kirby();
}

function draw(){
	background(map);
	kirby.display();
	kirby.move();
}
