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
		this.holding = false;
		this.obj = null;
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
		if (this.holding)
		{
			image(this.obj, this.xPos, this.yPos - 25, 30, 30);
		}
	}
	pickUp(obj)
	{
		this.holding = true;
		this.obj = obj;
	}
}

class Interactive
{
	constructor(sprite, x, y, hasObject, obj)
	{
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.hasObject = hasObject;
		this.obj = obj;
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

		if (spriteRight < kirbyLeft || spriteLeft > kirbyRight || spriteBottom < kirbyTop || spriteTop > kirbyBottom)
		{
			//console.log("chillin");
		}
		else
		{
			if (abs(kirbyTop - spriteBottom) <= 4)
			{
				kirby.yPos = spriteBottom;
			}
			if (abs(kirbyBottom - spriteTop) <= 4)
			{
				kirby.yPos = spriteTop - 50;
			}
			if (abs(kirbyRight - spriteLeft) <= 4)
			{
				kirby.xPos = spriteLeft - 50;
			}
			if (abs(kirbyLeft - spriteRight) <= 4)
			{
				kirby.xPos = spriteRight;
			}

			//if the table has an object, you can interact with it
			if (this.hasObject)
			{
				//but if kirby is already holding something, then drop it
				if (kirby.holding)
				{
					if (abs(kirbyTop - spriteBottom) < 10 && keyIsDown(16))
					
					{
						kirby.drop(this);
					}
					if (abs(kirbyBottom - spriteTop) < 10 && keyIsDown(16))
					{
						kirby.drop(this);
					}
					if (abs(kirbyRight - spriteLeft) < 10 && keyIsDown(16))
					{
						kirby.drop(this);
					}
					if (abs(kirbyLeft - spriteRight) < 10 && keyIsDown(16))
					{
						kirby.drop(this);
					}
				}
				//if not, pick it up.
				else
				{
					if (abs(kirbyTop - spriteBottom) < 10 && keyIsDown(16))
					{
						kirby.pickUp(this.obj);
					}
					if (abs(kirbyBottom - spriteTop) < 10 && keyIsDown(16))
					{
						kirby.pickUp(this.obj);
					}
					if (abs(kirbyRight - spriteLeft) < 10 && keyIsDown(16))
					{
						kirby.pickUp(this.obj);
					}
					if (abs(kirbyLeft - spriteRight) < 10 && keyIsDown(16))
					{
						kirby.pickUp(this.obj);
					}
				}
			}
		}
	}
	display()
	{
		image(this.sprite, this.x, this.y);
		if (this.hasObject)
		{
			image(this.obj, this.x, this.y, 30, 30);
		}
	}
}

function setup()
{
	createCanvas(800,600);
	kirby = new Kirby();
	fridgeObj = new Interactive(fridge,500,10, false, null);
	tableObj = new Interactive(table, 500, 400, true, meat);
	stoveObj = new Interactive(stove,400,10, false, null);

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
