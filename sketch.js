let fridge,burger,meat,kirby_move, kirby_stop, stove,table,tomato,cabbage,pan,knife,map, placeholder;
let kirby;

let fridgeObj, stoveObj, tableObj;

var counter=0;
var timeleft=90;

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
  tableleft = loadImage("assets/table_left.png");
  tablemiddle = loadImage("assets/table_middle.png");
  tableright = loadImage("assets/table_right.png");
  stove = loadImage("assets/stove.png");
  tomato = loadImage("assets/tomato.png");
  cabbage = loadImage("assets/veg.png");
  pan = loadImage("assets/pan.png");
  knife = loadImage("assets/knife.png");
  sink = loadImage("assets/sink.png");
	placeholder = loadImage("assets/swatch_light_gray.jpg");
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
			image(this.obj, this.xPos+10, this.yPos - 25, 30, 30);
		}
	}
	pickUp(obj)
	{
		this.holding = true;
		this.obj = obj;
	}
	drop(obj)
	{
		this.holding = false;
	}
	place(obj)
	{
		//place the object on the table.
		this.holding = false;
		return kirby.obj;
	}
}

class Interactive
{
	constructor(sprite, x, y, hasObject, obj, acceptedObj)
	{
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.hasObject = hasObject;
		this.obj = obj;
		this.acceptedObj = acceptedObj;
	}
	//kapp collision
	check(kirby)
	{
		//checks the right side
		//left, etc. for sprite and kirby
		let spriteTop   = this.y;
		let spriteBottom = this.y + this.sprite.height;
		let spriteRight = this.x + this.sprite.width;
		let spriteLeft  = this.x;
		let kirbyRight = kirby.xPos + 50;
		let kirbyLeft  = kirby.xPos;
		let kirbyTop    = kirby.yPos;
		let kirbyBottom = kirby.yPos + 50;
		// if(this.sprite === stove || this.sprite === fridge || this.sprite === sink){
		// 	spriteBottom = this.y + this.sprite.height;
		// 	spriteLeft = 0;
		// 	spriteRight = 800;
		// }
		// else{
		//     spriteLeft  = this.x;
		//     spriteRight = this.x + this.sprite.width;
		// 	spriteBottom = this.y + this.sprite.height;
		// }

		if (spriteRight < kirbyLeft || spriteLeft > kirbyRight || spriteBottom < kirbyTop || spriteTop > kirbyBottom)
		{

		}
		else
		{
			if (abs(kirbyTop - spriteBottom) <= 5)
			{
				kirby.yPos = spriteBottom;
			}
			if (abs(kirbyBottom - spriteTop) <= 5)
			{
				kirby.yPos = spriteTop - 50;
			}
			if (abs(kirbyRight - spriteLeft) <= 5)
			{
				kirby.xPos = spriteLeft - 50;
			}
			if (abs(kirbyLeft - spriteRight) <= 5)
			{
				kirby.xPos = spriteRight;
			}

			//if kirby is holding something, drop it on the object.
			if (kirby.holding && !this.hasObject)
			{
				if (keyIsDown(81))
				{
					if (this.acceptedObj !== null)
					{
						if (this.acceptedObj === true)
						{
							this.hasObject = true;
							this.obj = kirby.place();
						}
						else if (kirby.obj === this.acceptedObj)
						{
							this.hasObject = true;
							this.obj = kirby.place();
						}
					}
				}
			}
			//if the table has an object, you can interact with it
			if (this.hasObject)
			{
				//if kirby holding nothing
				if (!kirby.holding)
				{
					//DO NOTHING
					//key 32 is spacebar for picking up
					if (abs(kirbyTop - spriteBottom) < 10 && keyIsDown(32))
					{
						kirby.pickUp(this.obj);
						this.hasObject = false;
					}
					if (abs(kirbyBottom - spriteTop) < 10 && keyIsDown(32))
					{
						kirby.pickUp(this.obj);
						this.hasObject = false;
					}
					if (abs(kirbyRight - spriteLeft) < 10 && keyIsDown(32))
					{
						kirby.pickUp(this.obj);
						this.hasObject = false;
					}
					if (abs(kirbyLeft - spriteRight) < 10 && keyIsDown(32))
					{
						kirby.pickUp(this.obj);
						this.hasObject = false;
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
			//hard coded the pan to work
			if(this.sprite === sink || this.sprite === fridge || this.sprite === stove)
			{
				image(this.obj, this.x+10, this.y+20, 30, 30);
			}
			else
			{
				image(this.obj, this.x, this.y, 30, 30);
			}
		}
	}
	action()
	{
		if (this.sprite === stove && this.obj === meat)
		{
			this.cook();
		}
		else if (this.sprite === tableWithKnife && (this.obj.sprite === cabbage || this.obj.sprite === tomato))
		{
			this.chop();
		}
	}
}



//Timer: convert seconds to min

function convertSeconds(s)
{
    var min = floor (s/60);
    var sec = s % 60;
    return nf(min,2) + ":" + nf(sec,2);
}


function setup()
{
	createCanvas(800,600);
  kirby = new Kirby();
  fridgeObj = new Interactive(fridge,500,50, false, null, null);

  tableObj_left = new Interactive(tableleft, 590, 450, false, null, true);
  tableObj_middle = new Interactive(tablemiddle, 630, 450, false, null, true);
  tableObj_middle2 = new Interactive(tablemiddle, 665, 450, false, null, true);
  tableObj_right = new Interactive(tableright, 700, 450, false, null, true);

  tableObj2_left = new Interactive(tableleft, 590, 310, false, null, true);
  tableObj2_middle = new Interactive(tablemiddle, 630, 310, false, null, true);
  tableObj2_middle2 = new Interactive(tablemiddle, 665, 310, false, null, true);
  tableObj2_right = new Interactive(tableright, 700, 310, false, null, true);

  stoveObj = new Interactive(stove,400,50, false, null, meat);
  sinkObj = new Interactive(sink,250,50, false, null, true);
  tomatoObj1 = new Interactive(placeholder,100,320,true, tomato, true);
  tomatoObj2 = new Interactive(placeholder,155,320,true, tomato, true);
  tomatoObj3 = new Interactive(placeholder,155,380,true, tomato, true);
  tomatoObj4 = new Interactive(placeholder,100,380,true, tomato, true);
  cabbageObj1 = new Interactive(placeholder,100,450,true, cabbage, true);
  cabbageObj2 = new Interactive(placeholder,155,450,true, cabbage, true);
  cabbageObj3 = new Interactive(placeholder,155,510,true, cabbage, true);
  cabbageObj4 = new Interactive(placeholder,100,510,true, cabbage, true);

	//timer count down
	function timeIt ()
	{
	  counter ++;
	}

	setInterval(timeIt,1000);

}

function draw()
{
	background(map);
	textSize(32);
	text(kirby.xPos+" "+kirby.yPos, 50,50)
	kirby.move();
	fridgeObj.display();
	fridgeObj.check(kirby);
	tableObj_left.display();
	tableObj_left.check(kirby);
	tableObj_middle.display();
	tableObj_middle.check(kirby);
	tableObj_middle2.display();
	tableObj_middle2.check(kirby);
	tableObj_right.display();
	tableObj_right.check(kirby);
	tableObj2_left.display();
	tableObj2_left.check(kirby);
	tableObj2_middle.display();
	tableObj2_middle.check(kirby);
	tableObj2_middle2.display();
	tableObj2_middle2.check(kirby);
	tableObj2_right.display();
	tableObj2_right.check(kirby);
	stoveObj.display();
	stoveObj.check(kirby);
  sinkObj.display();
	sinkObj.check(kirby);
  tomato.resize(30, 38);
  tomatoObj1.display();
	tomatoObj1.check(kirby);
  tomatoObj2.display();
	tomatoObj2.check(kirby);
  tomatoObj3.display();
	tomatoObj3.check(kirby);
  tomatoObj4.display();
	tomatoObj4.check(kirby);
  cabbage.resize(30, 38);
  cabbageObj1.display();
	cabbageObj1.check(kirby);
  cabbageObj2.display();
	cabbageObj2.check(kirby);
  cabbageObj3.display();
	cabbageObj3.check(kirby);
  cabbageObj4.display();
	cabbageObj4.check(kirby);
	kirby.display();
  text("Time left: " + convertSeconds(timeleft-counter), 50, 70);
}
