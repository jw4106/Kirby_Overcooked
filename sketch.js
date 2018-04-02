let fridge,burger,meat,kirby_move, kirby_stop, stove,table,tomato,cabbage,pan,knife,map, placeholder;
let kirby, kirbyChef, kirbyChefObj;

let fridgeObj, stoveObj, tableObj, order;
let font, state, starty, bgMusic;

//timer variable
var counter=0;
//length of cooking meat 
var cooktime = 0;
var timeleft=150;
//plate object array
var platehas = [];
var score = 0;

function preload()
{
	//load every single asset we have such as sound, gifs and images. 
	kirby_run = loadGif("assets/kirbyrun.gif");
	kirby_run_left = loadGif("assets/kirbyrunleft.gif");
	kirby_move = loadGif("assets/kirbymove.gif");
	kirby_stop = loadImage("assets/kirbystop.png");
	kirby_move_left = loadGif("assets/kirbymoveleft.gif");
	kirby_stop_left = loadImage("assets/kirbystopleft.png");
	map = loadImage("assets/map.jpg");
	fridge = loadImage("assets/fridge.png");
	knife = loadImage("assets/knife.png");
	burger = loadImage("assets/burgerplate1.png");
	cuttomato = loadImage("assets/slicedtomato.png");
	cutcabbage = loadImage("assets/slicedcabbage.png")
	cookedmeat = loadImage("assets/cooked_meat.png");
	submittable = loadImage("assets/submit.png");
	submitword = loadImage("assets/submitword.png");
	meat = loadImage("assets/meat.png");
	tableleft = loadImage("assets/table_left.png");
	tablemiddle = loadImage("assets/table_middle.png");
	smoke = loadGif("assets/smoke.gif");
	tableright = loadImage("assets/table_right.png");
	stove = loadImage("assets/stove.png");
	tomato = loadImage("assets/tomato.png");
	cabbage = loadImage("assets/veg.png");
	pan = loadImage("assets/pan.png");
	knife = loadImage("assets/knife.png");
	sink = loadImage("assets/sink.png");
	plate = loadImage("assets/plate.png");
	placeholder = loadImage("assets/swatch_light_gray.jpg");
	kirbyChef = loadGif("assets/resized.gif");
	order = loadImage("assets/order.png");
	font = loadFont('assets/KirbyClassic.ttf');
	starty = loadImage("assets/startscreen.png");
	soundFormats("mp3", "m4a");
	bgMusic = loadSound("sounds/newbgmusic.m4a");
	cookMusic = loadSound("sounds/cooking.mp3");
	submitMusic = loadSound("sounds/submitmusic.mp3");

}

class Kirby
{
	//holds the xposition, yposition and states of kirby for movement and holding objects 
	constructor()
	{
		this.xPos = 400;
		this.yPos = 300;
		this.state = kirby_stop;
		this.holding = false;
		this.obj = null;
	}
	//movement logic for kirby
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
	//displays the object that kirby is holding 
	display()
	{
		image(this.state, this.xPos, this.yPos, 50,50);
		if (this.holding)
		{
			//if kirby is holding a plate, check if there is objects on the plate
			if(this.obj === plate)
			{
				//place ingredients based on platehas array
				image(this.obj, this.xPos+10, this.yPos-25, 30, 30);
				for(let i=0; i < platehas.length; i++){
					if(platehas[i] === cuttomato){
						image(platehas[i], this.xPos+10, this.yPos-25, 30, 30);
					}
					if(platehas[i] === cookedmeat){
						image(platehas[i], this.xPos+10, this.yPos-28, 30, 30);
					}
					if(platehas[i] === cutcabbage){
						image(platehas[i], this.xPos+10, this.yPos-27, 30, 30);
					}
				}
			}
			//scaling for burger display
			else if (this.obj === burger)
			{
				image(this.obj, this.xPos+10, this.yPos-25, 40, 40);
			}
			else {
				image(this.obj, this.xPos+10, this.yPos - 25, 30, 30);
			}
		}
	}
	//change kirby state if he holds something
	pickUp(obj)
	{
		this.holding = true;
		this.obj = obj;
	}
	//change state if drop
	drop(obj)
	{
		this.holding = false;
	}
	//function to return what kirby is holding
	place(obj)
	{
		//place the object on the table.
		this.holding = false;
		return kirby.obj;
	}
}

//interactable objects that hold items and can place items/make special actions
class Interactive
{
	//states for objects
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
			//if kirby is holding something, and object is a plate
			if (kirby.holding && this.obj === plate)
			{
				if (keyIsDown(81) && !platehas.includes(kirby.obj) && kirby.obj !== meat)
				{
					//plate only takes these things
					if(kirby.place() === cookedmeat || kirby.place() === cuttomato || kirby.place() === cutcabbage){
						//if plate has everything, turn to burger, empty platehas array
						if (platehas.length === 2)
						{
							this.hasObject = true;
							this.obj = burger;
							platehas = [];
						}
						//push object to plate array
						else if(!platehas.includes(kirby.place())){
							this.hasObject = true;
							platehas.push(kirby.place());
							//console.log(platehas);
						}
						else{
							kirby.obj = kirby.place()
						}
					}
				}
			}
			else if (kirby.obj === knife && (this.obj === cabbage || this.obj === tomato)){
				if (keyIsDown(81)){
					this.hasObject = true;
					if(this.obj === cabbage){
						this.obj = cutcabbage;
					}
					else if(this.obj === tomato){
						this.obj = cuttomato
					}
					kirby.obj = knife;
				}
			}
			//if the table has an object that is not a plate, you can interact with it
			else if (this.hasObject)
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
	//display ingredients/tools on top of interactable object
	display()
	{
		//display object
		image(this.sprite, this.x, this.y);
		//if there is an object
		if (this.hasObject)
		{
			//change burger to plate upon successful submission
			if(this.sprite === submittable && this.obj === burger){
					image(plate, this.x, this.y, 30, 30);
					this.obj = plate;
					score += 50;
					submitMusic.play()
			}
			//if object is table, and holds a plate display all items on plate as well
			else if((this.sprite === table || this.sprite === tablemiddle || this.sprite === tableleft || this.sprite === tableright) && this.obj === plate)
			{
				if (this.obj === burger)
				{
					image(this.obj, this.x-5, this.y-7, 40, 40);
				}
				else
				{
					image(this.obj, this.x, this.y, 30, 30);
				}
				//place ingredients based on platehas array
				for(let i=0; i < platehas.length; i++){
					if(platehas[i] === cuttomato){
						image(platehas[i], this.x, this.y, 30, 30);
					}
					if(platehas[i] === cookedmeat){
						image(platehas[i], this.x, this.y-3, 30, 30);
					}
					if(platehas[i] === cutcabbage){
						image(platehas[i], this.x, this.y-2, 30, 30);
					}
				}
			}
			else
			{
				//scaling display for burger 
				if (this.obj === burger)
				{
					image(this.obj, this.x-5, this.y-7, 40, 40);
				}
				else
				{
					image(this.obj, this.x, this.y, 30, 30);
				}
			}
		}
	}
	action()
	{
		//if cooking...cook and play cooking music
		if (this.sprite === stove && this.obj === meat)
		{
			let counter = 0;
			cookMusic.play();
			this.cook(counter);
		}
		if ((this.sprite === table || this.sprite === tablemiddle || this.sprite === tableright || this.sprite === tableleft) && this.obj === meat)
		{
			let counter = 0;
			this.cook(counter);
		}
	}
	cook(counter)
	{
		textSize(16);
		if(cooktime === 300){
			this.obj = cookedmeat;
			cooktime = 0;
			cookMusic.stop();
		}
		else{
			image(smoke, 405, 35, 60, 60);
			cooktime++;
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
	//initialize everything! 
	fridgeObj = new Interactive(fridge,500,50, false, null, null);

	submission = new Interactive(submittable, 650, 110, false, null, true);
	submitwords = new Interactive(submitword, 650,50,false,null,false);

	tableObj_left = new Interactive(tableleft, 590, 500, true, meat, true);
	tableObj_middle = new Interactive(tablemiddle, 630, 500, true, meat, true);
	tableObj_middle2 = new Interactive(tablemiddle, 665, 500, true, meat, true);
	tableObj_right = new Interactive(tableright, 700, 500, true, meat, true);

	tableObj2_left = new Interactive(tableleft, 590, 310, false, null, true);
	tableObj2_middle = new Interactive(tablemiddle, 630, 310, true, plate, true);
	tableObj2_middle2 = new Interactive(tablemiddle, 665, 310, false, null, true);
	tableObj2_right = new Interactive(tableright, 700, 310, true, meat, true);

	tableObj3_left = new Interactive(tableleft, 340, 500, false, null, true);
	tableObj3_middle = new Interactive(tablemiddle, 380, 500, true, tomato, true);
	tableObj3_middle2 = new Interactive(tablemiddle, 415, 500, true, knife, true);
	tableObj3_right = new Interactive(tableright, 450, 500, true, cabbage, true);

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
	bgMusic.play();
	state = 0;
	//timer count down
	function timeIt ()
	{
	  counter ++;
	}

	setInterval(timeIt,1000);

}

function draw()
{
	console.log(state);
	if (state === 0)
	{
		background(starty);
		if (keyIsDown(32))
		{
			state = 1;
			timeleft = 150;
			counter = 0;
		}
	}
	//gamestart
	else if (state === 1)
	{
		//display and set collision
		background(map);
		kirby.move();

		fridgeObj.display();
		fridgeObj.check(kirby);

		//this is aggressive
		submission.display();
		submission.check(kirby);
		submitwords.display();
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
		tableObj3_left.display();
		tableObj3_left.check(kirby);
		tableObj3_middle.display();
		tableObj3_middle.check(kirby);
		tableObj3_middle2.display();
		tableObj3_middle2.check(kirby);
		tableObj3_right.display();
		tableObj3_right.check(kirby);
		stoveObj.display();
		stoveObj.check(kirby);
		stoveObj.action();
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
		//User Interface
		textFont(font, 14);
		text("Kirby's Burger Recipe:", 10, 60)
		image(order, 165, 10, 90, 90);
		textFont(font, 25);
		text("Time left: " + convertSeconds(timeleft-counter), 300, 50);
		text("Score: " + score, 300, 25);
		if (timeleft-counter < 0)
		{
			state = 2;
		}
	}
	//game over screen
	else if (state === 2)
	{
		background(starty);
		textFont(font, 25);
		text("Score: " + score, 325, 550);
		if (keyIsDown(32))
		{
			state = 1;
			timeleft = 150;
			counter = 0;
			score = 0;
		}
	}
}
