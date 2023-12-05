class Player {
  constructor(x, y, color, imageSrc) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.spriteImage = new Image();
    this.spriteImage.src = imageSrc;
    this.frameWidth = 64;
    this.frameHeight = 80;
    this.frameX = 0;
    this.frameY = 0;

    // ANIMATION
    this.animation = false;
    this.maxFrames = 3;
    this.framesPerSecond = 10;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.framesPerSecond;

    this.width = this.frameWidth;
    this.height = this.frameHeight;

    console.log("a player instance was created with color", this.color);
  }
  draw(ctx, deltaTime) {
    // DONE: finish the method to be able to draw via canvas context (ctx)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.animation) {
      // console.log(this.frameTimer)
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrames) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    } else {
      this.frameX = 0;
    }


    ctx.drawImage(
      this.spriteImage, // Image src
      this.frameX * this.frameWidth, // Left
      this.frameY * this.frameHeight, // Top
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move(x, y, direction = 0, state = true, frames = 3) {
    // DONE: finish the method to be able move position
    this.x += x;
    this.y += y;
    this.frameY = direction;
    this.animation = state;
    this.maxFrames = frames
  }
}
