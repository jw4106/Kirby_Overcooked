let fridge,burger,meat,kirby_move, kirby_stop, stove,table,tomato,cabbage,pan,knife,map;
let kirby;

let fridgeObj, stoveObj, tableObj;
function preload()
{
	kirby_run = loadGif("assets/kirbyrun.gif");
	kirby_run_left = loadGif("assets/kirbyrunleft.gif");
	kirby_move = loadGif("assets/kirbymove.gif");
	kirby_stop = loadImage("assets/kirbystop.png");
	kirby_move_left = loadGif("assets/kirbymoveleft.gif");
	kirby_stop_left = loadImage("assets/kirbystopleft.png");
	map = loadImage("assets/map.jpg");
  fridge = loadImage("assets/fridge.png");
  burger = loadGif("assets/burger.gif");
  meat = loadImage("assets/meat.png");
  table = loadImage("assets/table.jpg");
  stove = loadImage("assets/stove.png");
  tomato = loadImage("assets/tomato.png");
  cabbage = loadImage("assets/veg.png");
  pan = loadImage("assets/pan.png");
  knife = loadImage("assets/knife.png");
}

class Kirby
{
	constructor()
	{
		this.xPos = 400;
		this.yPos = 300;
		this.state = kirby_stop;
	}
	move()
	{
		//left, shift
		if (keyIsDown(65) && keyIsDown(16) && this.xPos > 0)
		{
			this.xPos -= 4;
			this.state = kirby_run_left;
		}
		//left basic
		else if (keyIsDown(65) && this.xPos > 0)
		{
			this.xPos -= 2;
			this.state = kirby_move_left;
		}
		//right and shift
		if (keyIsDown(68) && keyIsDown(16) && this.xPos < 750)
		{
			this.xPos += 4;
			this.state = kirby_run;
		}
		//right
		else if (keyIsDown(68) && this.xPos < 750)
		{
			this.xPos += 2;
			this.state = kirby_move;
		}
		//up and shift
		if (keyIsDown(87) && keyIsDown(16) && this.yPos > 0)
		{
			if (keyIsDown(65))
			{
				this.yPos -=4;
				this.state = kirby_run_left;
			}
			else
			{
				this.yPos -= 4;
				this.state = kirby_run;
			}
		}
		//up
		else if (keyIsDown(87) && this.yPos > 0)
		{
			if (keyIsDown(65))
			{
				this.yPos -=2;
				this.state = kirby_move_left;
			}
			else
			{
				this.yPos -= 2;
				this.state = kirby_move;
			}
		}
		//down and shift
		if (keyIsDown(83) && keyIsDown(16) && this.yPos < 550)
		{
			if (keyIsDown(65))
			{
				this.yPos +=4;
				this.state = kirby_run_left;
			}
			else
			{
				this.yPos += 4;
				this.state = kirby_run;
			}
		}
		//down
		else if (keyIsDown(83) && this.yPos < 550)
		{
			if (keyIsDown(65))
			{
				this.yPos += 2;
				this.state = kirby_move_left
			}
			else
			{
				this.yPos += 2;
				this.state = kirby_move;
			}
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

class Interactive
{
	constructor(sprite, x, y)
	{
		this.sprite = sprite;
		this.x = x;
		this.y = y;
	}
	//kapp collision
	check(kirby)
	{
		//checks the right side
		let spriteRight = this.x + this.sprite.width;
		//left, etc. for sprite and kirby
		let spriteLeft  = this.x;
		let spriteTop   = this.y;
		let spriteBottom = this.y + this.sprite.height;

		let kirbyRight = kirby.xPos + 50;
		let kirbyLeft  = kirby.xPos;
		let kirbyTop    = kirby.yPos;
		let kirbyBottom = kirby.yPos + 50;

		//debug
		console.log("spriteRight:" + spriteRight);
		console.log("spriteLeft:" + spriteLeft);
		console.log("spriteBottom:" + spriteBottom);
		console.log("spriteTop:" + spriteTop);

		console.log("kirbyRight:" + kirbyRight);
		console.log("kirbyLeft:" + kirbyLeft);
		console.log("kirbyBottom:" + kirbyBottom);
		console.log("kirbyTop:" + kirbyTop);


		/*

		sketch.js:158 spriteRight:555
		sketch.js:159 spriteLeft:400
		sketch.js:160 spriteBottom:359
		sketch.js:161 spriteTop:300
		sketch.js:163 kirbyRight:514
		sketch.js:164 kirbyLeft:464
		sketch.js:165 kirbyBottom:406
		sketch.js:166 kirbyTop:356


		*/

		if (spriteRight < kirbyLeft || spriteLeft > kirbyRight || spriteBottom < kirbyTop || spriteTop > kirbyBottom)
		{
			//console.log("chillin");
		}
		else
		{
			if (abs(kirbyTop - spriteBottom) < 3)
			{
				kirby.yPos = spriteBottom + 3;
			}
			if (abs(kirbyBottom - spriteTop) < 3)
			{
				kirby.yPos = spriteTop - 53;
			}
			if (abs(kirbyRight - spriteLeft) < 3)
			{
				kirby.xPos = spriteLeft - 53;
			}
			if (abs(kirbyLeft - spriteRight) < 3)
			{
				kirby.xPos = spriteRight + 3;
			}
		}
	}
	display()
	{
		image(this.sprite, this.x, this.y);
	}
}

function setup()
{
	createCanvas(800,600);
	kirby = new Kirby();
	fridgeObj = new Interactive(fridge,500,10);
	tableObj = new Interactive(table, 500, 400);
	stoveObj = new Interactive(stove,400,10);

}

function draw()
{
	background(map);
	kirby.display();
	kirby.move();
	fridgeObj.display();
	fridgeObj.check(kirby);
	tableObj.display();
	tableObj.check(kirby);
	stoveObj.display();
	stoveObj.check(kirby);
}
