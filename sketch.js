
//174*156 (initially)

//player sprite!!!
let blobSprite;

//player object
let player;

function preload()
{
  assetDelivery();
  soundDelivery();
}

function assetDelivery()
{
  blobSprite = loadImage("assets/blob.jpg");
}

function soundDelivery()
{
  console.log("loaded sounds");
}

function setup()
{
  // set the background size of our canvas
  createCanvas(960, 640);
  player = new Blob();
  // white background
  //background(255);
}



function draw()
{
  background(255);
  player.display();
  player.move();
}

class Blob
{
  constructor()
  {
    this.xPos = 250;
    this.yPos = 250;
    this.sprite = blobSprite;
    this.xSpeed = 5;
    this.ySpeed = 5;
  }
  display()
  {
    image(this.sprite, this.xPos, this.yPos);
  }
  move()
  {
    this.containMe();
    this.keyboardLogic();
  }
  //the logic to contain the player within the world.
  //can be modified if we want different gameplay.
  //this is temporary but iterable
  containMe()
  {
    //contain logic within borders
    if (this.xPos + this.sprite.width > width)
    {
      this.xPos = width - this.sprite.width;
    }
    if (this.xPos < 0)
    {
      this.xPos = 0;
    }
    if (this.yPos > height-this.sprite.height)
    {
      this.yPos = height - this.sprite.height;
    }
    if (this.yPos < 0)
    {
      this.yPos = 0;
    }
  }
  keyboardLogic()
  {
    // move left? KEY: A
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65))
    {
      // subtract from character's xpos
      this.xPos -= this.xSpeed;
      console.log(this.xPos, this.yPos);
    }
    // move right? KEY: D
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68))
    {
      // add to character's pos
      this.xPos += this.xSpeed;
      console.log(this.xPos, this.yPos);
    }
    //move down? KEY: S
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83))
    {
      // subtract to character's ypos
      this.yPos += this.ySpeed;
      console.log(this.xPos, this.yPos);
    }
    //move up? KEY: W
    if (keyIsDown(UP_ARROW) || keyIsDown(87))
    {
      // add to character's pos
      this.yPos -= this.ySpeed;
      console.log(this.xPos, this.yPos);
    }

  }
}
