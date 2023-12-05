class Player {
  constructor(x, y, color, imageSrc) {
    this.x = x;
    this.y = y;

    // 1. Add Image
    this.spriteImage = new Image();
    this.spriteImage.src = imageSrc;
    this.spriteWidth = 64;
    this.spriteHeight = 80;

    this.color = color;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    this.frameX = 0;
    this.frameY = 0;

    //Mattias 3. Animation
    this.animation = false;
    this.maxFrames = 3; // It has 4 fremas 0-3
    this.framesPerSecond = 10;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.framesPerSecond;

    console.log(
      "a player instance was created with color:",
      this.color,
      "and this image:",
      this.spriteImage
    );
  }

  draw(ctx, deltaTime) {
    // DONE: finish the method to be able to draw via canvas context (ctx)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.animation) {
      this.frameTimer += deltaTime;
      // console.log("it's moving");
      if (this.frameTimer > this.frameInterval) {
        this.frameX < this.maxFrames ? this.frameX++ : (this.frameX = 0);
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      
      ctx.drawImage(
        this.spriteImage,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      // console.log("it's still");
      this.frameX = 0;
      ctx.drawImage(
        this.spriteImage,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  move(x, y, direction = 0, state=true) {
    // DONE: finish the method to be able move position
    this.x += x;
    this.y += y;
    this.frameY = direction;
    // MATTIAS: Add state on move
    this.animation = state;
    
  }
}
