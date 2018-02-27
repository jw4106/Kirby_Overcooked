
//174*156 (initially)

//player sprite!!!
let blobSprite;

//player object
let player;

//global jump boolean
let jump;

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

function keyPressed()
{
  if (key === " ")
  {
    console.log("SPACEBAR");
    jump = true;
  }
}
/*
function keyReleased()
{
  if (key === " ")
  {
    console.log("RELEASED");
    //if (jump)
    jump = true;
  }
}*/

function setup()
{
  // set the background size of our canvas
  createCanvas(960, 640);
  player = new Blob();
}

function draw()
{
  background(255);
  player.drawAndMove();
}

class Blob
{
  //build me a blob
  constructor()
  {
    this.xPos = 250;
    this.yPos = 250;
    this.sprite = blobSprite;
    this.xSpeed = 5;
    this.ySpeed = 5;

    this.gravityVal = .2;
    this.jumpVal = 5;
  }
  //show me a blob
  display()
  {
    image(this.sprite, this.xPos, this.yPos);
  }
  //move the blob.
  //calls containMe and keyboardLogic
  move()
  {
    this.gravity();
    this.keyboardLogic();
    this.jump();
    this.containMe();
  }


  //makes easier to call in draw(). cleaner.
  drawAndMove()
  {
    this.display();
    this.move();
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
    if (this.yPos > height - this.sprite.height)
    {
      this.yPos = height - this.sprite.height;
    }
    if (this.yPos < 0)
    {
      this.yPos = 0;
    }
  }
  //logic with WASD and arrow key controls
  keyboardLogic()
  {
    // move left? KEY: A
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65))
    {
      // subtract from character's xpos
      this.xPos -= this.xSpeed;
    }
    // move right? KEY: D
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68))
    {
      // add to character's pos
      this.xPos += this.xSpeed;
    }
    //move down? KEY: S
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83))
    {
      // subtract to character's ypos
      this.yPos += this.ySpeed;
    }
    //move up? KEY: W
    if (keyIsDown(UP_ARROW) || keyIsDown(87))
    {
      // add to character's pos
      this.yPos -= this.ySpeed;
    }
  }
  //add gravity to y
  gravity()
  {
    this.ySpeed += this.gravityVal;
    this.yPos += this.ySpeed;

    //stop applying gravity once you hit the ground
    if (this.yPos > height - this.sprite.height)
    {
      this.ySpeed = 0;
    }
  }
  //jump buttons
  jump()
  {
    if (jump)
    {
      if (this.ySpeed === 0)
      {
        jump = false;
      }
      else {

      }
      console.log("JUMPING at " + this.yPos);
      console.log("JUMPING with " + this.ySpeed);
      this.yPos -= this.jumpVal;
    }
  }
}
